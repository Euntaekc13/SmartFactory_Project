const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/middlewares");

const { listUser, joinUser, deleteUser } = require("../controllers/admin");

router.get("/auth/list", verifyToken, listUser); // 사용자 리스트 조회 (admin만 가능)
router.post("/auth/join", verifyToken, joinUser); // 사용자 등록 (admin만 가능)
router.delete("/auth/delete/:UserId", verifyToken, deleteUser); // 사용자 삭제 (admin만 가능)

module.exports = router;
