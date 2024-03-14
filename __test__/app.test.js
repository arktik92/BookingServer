const request = require("supertest");
const app = require("../app");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMTc0NjAsImV4cCI6MTcwNTMyMTA2MH0.NpNk1VfRrDXDytPZsOPiPsT-pAQOrverRly4wUF-JSU";

/*----------------------------------------------------------------------------RESERVATIONS-------------------------------------------------------------------------------------------*/

// GET
describe("GET /api/reservations", () => {
  it("should return a 401 error", async () => {
    const res = await request(app)
      .get("/api/reservations")
      .expect("Content-Type", /json/)
      .expect(401);
  });
});

describe("GET /api/reservations", () => {
  it("should return a 200 error", async () => {
    const res = await request(app)
      .get("/api/reservations")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

// POST
describe("POST /api/reservations", () => {
  it("should return a 401 error", async () => {
    const res = await request(app)
      .post("/api/reservations")
      .send({
        date: "supertest",
        name: "supertest",
        note: "supertest",
        status: 1,
        userId: 99,
        spotId: 99,
        roomId: 99,
      })
      .expect(401);
  });
});

describe("POST /api/reservations", () => {
  it("should return a 200 error", async () => {
    const res = await request(app)
      .post("/api/reservations")
      .set("Authorization", token)
      .send({
        date: "2023-10-26T09:12:18.345Z",
        name: "DataTypes",
        note: "DataTypes",
        status: 1,
        userId: 99,
        spotId: 99,
        roomId: 99,
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });
});

// PUT
// DELETE

/*---------------------------------------------------------------------------------------ROOMS------------------------------------------------------------------------------------*/

// GET
describe("GET /api/rooms", () => {
  it("should return a 401 error", async () => {
    const res = await request(app)
      .get("/api/rooms")
      .expect("Content-Type", /json/)
      .expect(401);
  });
});

describe("GET /api/rooms", () => {
  it("should return a 200 error", async () => {
    const res = await request(app)
      .get("/api/rooms")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

// POST
describe("POST /api/rooms", () => {
  it("should return a 401 error", async () => {
    const res = await request(app)
      .post("/api/rooms")
      .send({
        name: "supertest",
      })
      .expect(401);
  });
});

describe("POST /api/rooms", () => {
  it("should return a 200 error", async () => {
    const res = await request(app)
      .post("/api/rooms")
      .set("Authorization", token)
      .send({
        name: "supertest",
      })
      .expect(201);
  });
});

// PUT

// DELETE

/*------------------------------------------------------------------------------------------SPOTS---------------------------------------------------------------------------------*/

// GET
describe("GET /api/spots", () => {
  it("should return a 401 error", async () => {
    const res = await request(app)
      .get("/api/spots")
      .expect("Content-Type", /json/)
      .expect(401);
  });
});

describe("GET /api/spots", () => {
  it("should return a 200 error", async () => {
    const res = await request(app)
      .get("/api/spots")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

// POST
describe("POST /api/spots", () => {
  it("should return a 401 error", async () => {
    const res = await request(app)
      .post("/api/spots")
      .send({
        name: "supertest",
      })
      .expect(401);
  });
});

describe("POST /api/spots", () => {
  it("should return a 200 error", async () => {
    const res = await request(app)
      .post("/api/spots")
      .set("Authorization", token)
      .send({
        name: "supertest",
      });
  });
});

// PUT
// DELETE

/*--------------------------------------------------------------------------------------USERS-------------------------------------------------------------------------------------*/

// GET
describe("GET /api/users", () => {
  it("should return a 401 error", async () => {
    const res = await request(app)
      .get("/api/users")
      .expect("Content-Type", /json/)
      .expect(401);
  });
});

describe("GET /api/users", () => {
  it("should return a 200 error", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200);
  });
});


// PUT
// DELETE

/*--------------------------------------------------------------------------------------SIGNIN-------------------------------------------------------------------------------------*/
// describe("POST /auth/signin", () => {
//   it("should return status 200", async () => {
//     const res = await request(app)
//       .post("/auth/signin")
//       .send({
//         email: "esteban@testeeeeeee.fr",
//         password: "testarktik",
//       })
//       .expect(201);
//   });
// });

// /*--------------------------------------------------------------------------------------SIGNUP-------------------------------------------------------------------------------------*/ describe("POST /auth/signin", () => {
//   it("should return status 200", async () => {
//     const res = await request(app)
//       .post("/auth/signup")
//       .send({
//         firstName: "estebán",
//         lastName: "semellier",
//         password: "testarktik",
//         role: "admin",
//         email: "esteban@test.fr",
//         phoneNumber: "0761401011",
//       })
//       .expect(201);
//   });
// });
