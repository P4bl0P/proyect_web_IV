import bcrypt from 'bcrypt';

const plain = '123456';
const hash = '$2b$10$/YG/2fvBLC2nI50y2B3WaOAdvJvZKKpK8IIjVoHUdnJZ.3veOy9D.';

const isMatch = await bcrypt.compare(plain, hash);
console.log(isMatch);