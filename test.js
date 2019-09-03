const request = require("supertest");
const {expect} = require("chai");
const { Client } = require("pg");
const client = new Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: 12345,
});
client.connect();
async function getNote() {
    return  client.query("SELECT * FROM notes ORDER BY id DESC limit 1")
}
async function getTag() {
    return  client.query("SELECT * FROM tags ORDER BY id DESC limit 1")
}
async function getComment() {
    return  client.query("SELECT * FROM comments ORDER BY id DESC limit 1")
}
async function getUser() {
    return  client.query("SELECT * FROM users ORDER BY id DESC limit 1")
}

const agent = request.agent("http://localhost:3000");

describe("Sessions", () => {
    it('Создание пользователя', (done) => {
      agent.post('/api/v2/users')
        .send({
          username: 'qax',
          password: 'qax',
          email: 'qax@mail.ru',
          date: '12.12.12',
          telephone: 123456,
          my_like: 0,
          notes_count: 0,
        })
        .end((err, req, res) => {
          expect(req.status).to.equal(302);
          done();
        });
    });
    it("Создание сессии", (done) => {
        getUser()
            .then(user => {
            agent.post("/api/v2/login")
                .send({ username: user.rows[0].email, password: user.rows[0].password })
                .end((err, req, res) => {
                    expect(req.status).to.equal(302);
                    done();
                });
        })
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
    it('Редактирование заметки', (done) => {
        getNote()
            .then(note => {
                const path = `/api/v2/notes/${note.rows[0].id}`;
                agent.put(path)
                    .send({
                        text: 'dsssfdfsf',
                    })
                    .end((err, req, res) => {
                        expect(req.status).to.equal(202);
                        done();
                    });
            })

    });
    it('Добавление c комментария', (done) => {
        getNote().then(note => {
            agent.post('/api/v2/comments')
                .send({
                    text: 'req.body.text',
                    note: note.rows[0].id,
                })
                .end((err, req, res) => {
                    expect(req.status).to.equal(202);
                    done();
                });
        })

    });
    it('Удаление комментария', (done) => {
        getComment()
            .then(comment => {
                agent.delete(`/api/v2/comments/${comment.rows[0].id}`)
                    .end((err, req, res) => {
                        expect(req.status).to.equal(202);
                        done();
                    });
            })
    });
    it('Нажимаем на лайк', (done) => {
        getNote()
            .then(note => {
                getUser().then(user => {
                    agent.post(`/api/v2/notes/${note.rows[0].id}/likes`)
                        .send({
                            noteId: note.rows[0].id,
                            userId: user.rows[0].id,
                        })
                        .end((err, req, res) => {
                            expect(req.status).to.equal(202);
                            done();
                        });
                })

            })

    });
    it('Добавление тэга', (done) => {
        getNote()
            .then(note => {
                agent.post('/api/v2/tags')
                    .send({
                        tag: '123123safa',
                        note: note.rows[0].id,
                    })
                    .end((err, req, res) => {
                        expect(req.status).to.equal(202);
                        done();
                    });
            })
    });
    it('Удаление тэга', (done) => {
        getTag()
            .then(tag => {
                agent.delete(`/api/v2/tags/${tag.rows[0].id}`)
                    .end((err, req, res) => {
                        expect(req.status).to.equal(202);
                        done();
                    });
            })
    });
    it('Удаление заметки', (done) => {
        getNote()
            .then(note => {
                agent.delete(`/api/v2/notes/${note.rows[0].id}`)
                    .end((err, req, res) => {
                        expect(req.status).to.equal(202);
                        done();
                    });
            })
    });
});