import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: false },
  maritalStatus: { type: String, required: true },
  picture: { type: String, required: false},
  role: { type: String, enum: ['superadmin', 'admin', 'user'], default: 'user' },
  password: { type: String, required: false },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
