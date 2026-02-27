import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import * as path from 'path'
import * as fs from 'fs'

// Manual .env.local loader
const envFile = path.resolve(process.cwd(), '.env.local')
const envContent = fs.readFileSync(envFile, 'utf-8')
envContent.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
})

async function seedAdmin() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('❌ MONGODB_URI not found in .env.local')
    process.exit(1)
  }

  await mongoose.connect(uri)
  console.log('✅ Connected to MongoDB')

  const UserSchema = new mongoose.Schema({
    name:               { type: String, required: true },
    email:              { type: String, unique: true, lowercase: true },
    password:           { type: String, required: true },
    role:               { type: String, default: 'admin' },
    mustChangePassword: { type: Boolean, default: true },
    createdAt:          { type: Date, default: Date.now },
  })

  const User = mongoose.models.User || mongoose.model('User', UserSchema)

  const existing = await User.findOne({ email: 'admin@taskforge.com' })
  if (existing) {
    console.log('⚠️  Admin already exists — admin@taskforge.com')
    await mongoose.disconnect()
    process.exit(0)
  }

  const hashed = await bcrypt.hash('TempAdmin@123', 12)

  await User.create({
    name:               'System Admin',
    email:              'admin@taskforge.com',
    password:           hashed,
    role:               'admin',
    mustChangePassword: true,
  })

  console.log('✅ Admin created!')
  console.log('   Email:    admin@taskforge.com')
  console.log('   Password: TempAdmin@123')
  console.log('   ⚠️  Login and change this password immediately.')

  await mongoose.disconnect()
  process.exit(0)
}

seedAdmin().catch(e => {
  console.error('❌ Seed failed:', e)
  process.exit(1)
})