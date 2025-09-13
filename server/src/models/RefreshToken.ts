import mongoose, { InferSchemaType, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const refreshTokenSchema = new Schema({
    token: {
        type: String,
        required: [true, 'Please provide a refresh token'],
        unique: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user id'],
    },
    tokenId: {
        type: String,
        required: [true, 'Please provide a token id'],
    },
    expiresAt: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

refreshTokenSchema.pre('save', async function () {
  this.token = await bcrypt.hash(this.token, 10);
});

export type RefreshTokenType = InferSchemaType<typeof refreshTokenSchema>;
const RefreshToken = model<RefreshTokenType>('RefreshToken', refreshTokenSchema);
export default RefreshToken;
