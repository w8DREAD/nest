const request = require("supertest");
const {expect} = require("chai");
const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: 12345,
});
client.connect();

const getNote = new Promise((resolve, reject) => {
  client.query("SELECT * FROM notes ORDER BY id DESC limit 1", (err, res) => {
    resolve(res.rows);
  });
});
const getComment = new Promise((resolve, reject) => {
  client.query("SELECT * FROM comments ORDER BY id DESC limit 1", (err, res) => {
    resolve(res.rows);
  });
});
const getTags = new Promise((resolve, reject) => {
  client.query("SELECT * FROM tags ORDER BY id DESC limit 1", (err, res) => {
    resolve(res.rows);
  });
});

const agent = request.agent("http://localhost:3000");

describe("Sessions", () => {
  // it('Создание пользователя', (done) => {
  //   agent.post('/api/v2/users')
  //     .send({
  //       username: 'asd',
  //       password: 'asd',
  //       email: 'asd@mail.ru',
  //       date: '12.12.12',
  //       telephone: 123456,
  //       my_like: 0,
  //       notes_count: 0,
  //     })
  //     .end((err, req, res) => {
  //       expect(req.status).to.equal(302);
  //       done();
  //     });
  // });
  it("Создание сессии", (done) => {
    agent.post("/api/v2/login")
      .send({ username: "asd@mail.ru", password: "asd" })
      .end((err, req, res) => {
        expect(req.status).to.equal(302);
        done();
      });
  });
    it("Добавление Заметки", (done) => {
      agent.post("/api/v2/notes")
        .send({
          text: "req.body.tagText", date: "12.12.12",
        })
        .end((err, req, res) => {
          expect(req.status).to.equal(302);
          done();
        });
    });
    it('Редактирование заметки', async (done) => {
      const note = await getNote;
      const path = `/api/v2/notes/${note[0].id}`;
      agent.put(path)
        .send({
          text: 'dsssfdfsf',
        })
        .end((err, req, res) => {
          expect(req.status).to.equal(202);
          done();
        });
    });
      it('Добавление c комментария', async (done) => {
        const note = await getNote;
        agent.post('/api/v2/comments')
          .send({
            text: 'req.body.text',
            note: note[0].id,
          })
          .end((err, req, res) => {
            expect(req.status).to.equal(202);
            done();
          });
      });
      it('Удаление комментария', async (done) => {
        const comment = await getComment;
        agent.delete(`/api/v2/comments/${comment[0].id}`)
          .end((err, req, res) => {
            expect(req.status).to.equal(202);
            done();
          });
      });
      it('Нажимаем на лайк', async (done) => {
        const note = await getNote;
        agent.post(`/api/v2/notes/${note[0].id}/likes`)
          .send({
            noteId: note[0].id,
            userId: 1,
          })
          .end((err, req, res) => {
            expect(req.status).to.equal(202);
            done();
          });
      });
      it('Добавление тэга', async (done) => {
        const note = await getNote;
        agent.post('/api/v2/tags')
          .send({
            text: '123123safa',
            note: note[0].id,
          })
          .end((err, req, res) => {
            expect(req.status).to.equal(202);
            done();
          });
      });
      it('Удаление тэга', async (done) => {
        const tag = await getTags;
        agent.delete(`/api/v2/tags/${tag[0].id}`)
          .end((err, req, res) => {
            expect(req.status).to.equal(202);
            done();
          });
      });
  });
