import { db } from "../mysql.js";
import { authQuery } from "../query/auth.js";

// 이메일 중복 확인
export async function findByEmail(email) {
  return db
    .execute(authQuery.selectUserByEmail, [email])
    .then((result) => result[0][0]);
}

// 폰 번호 중복 확인
export async function findByPhone(phone_number) {
  return db
    .execute(authQuery.selectUserByphone, [phone_number])
    .then((result) => result[0][0]);
}

// 회원가입
export async function createUser(user) {
  const { phone_number, email, login_password, manager_name } = user;
  return db
    .execute(authQuery.insertUser, [
      phone_number,
      email,
      login_password,
      manager_name,
    ])
    .then((result) => result[0].insertId);
}

// 사용자 ID로 찾기
export async function findById(id) {
  const query = "SELECT * FROM PFB_MANAGER WHERE id=?";
  return db.execute(query, [id]).then((result) => result[0][0]);
}

// 사용자 email 찾기
export async function findEmailByUserInfo(username, phoneNumber) {
  try {
    const [rows] = await db.execute(authQuery.findEmail, [
      username,
      phoneNumber,
    ]);
    console.log(rows);
    return rows[0]?.email || null; // 이메일 반환 또는 null
  } catch (error) {
    console.error("Error in findEmailByUserInfo:", error);
    throw error;
  }
}

// 유저 정보 조회
export async function findUserByInfo(name, phoneNumber, email) {
  try {
    const [rows] = await db.execute(authQuery.findUserByInfo, [
      name,
      phoneNumber,
      email,
    ]);
    return rows[0] || null;
  } catch (error) {
    console.error("Error in findUserByInfo:", error);
    throw error;
  }
}

// 비밀번호 찾기
export async function updatePassword(userId, hashedPassword) {
  try {
    await db.execute(authQuery.updatePassword, [hashedPassword, userId]);
  } catch (error) {
    console.error("Error in updatePassword:", error);
    throw error;
  }
}

// 비밀번호 해시화
export async function hashPassword(password) {
  try {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.error("Error in hashPassword:", error);
    throw error;
  }
}

// 기존 비밀번호 가져오기
export const getUserPassword = async (userId) => {
  const [result] = await db.execute(authQuery.selectUserPassword, [userId]);
  return result[0];
};

// 비밀번호 변경 (스스로 변경)
export const updatePasswordData = async (userId, newPassword) => {
  await db.execute(authQuery.correctPassword, [newPassword, userId]);
  console.log(); // 잘 들어왔는지만 확인
};

// 유저 설정 페이지 정보 가져오기
export async function findManagerInfoByid(id) {
  // SQL에서 ?값만 여기에서 취급
  try {
    const [rows] = await db.execute(authQuery.findManagerInfo, [id]);
    return rows[0] || null;
  } catch (error) {
    console.error("Error in findManagerInfoByid:", error);
    throw error;
  }
}
