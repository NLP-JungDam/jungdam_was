import mysql from 'mysql2/promise';
import { config } from './config.js';

// MySQL 연결 풀 생성
export const db = await mysql.createPool({
  host: config.db.db_host,
  user: config.db.db_user,
  password: config.db.db_password,
  database: config.db.db_database,
  port: config.db.db_port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 연결 테스트
try {
  const connection = await db.getConnection();
  console.log('✅ Database connected successfully!');
  connection.release();
} catch (error) {
  console.error('❌ Database connection failed:', error);
}
