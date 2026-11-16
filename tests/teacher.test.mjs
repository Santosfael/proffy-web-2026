import { test } from 'node:test'
import assert from 'node:assert/strict'
import { teacherSchema, emptyTeacher, maskPhone, saveTeacher, loadTeacher } from '../src/features/teacher/model.ts'
const valid = { name: 'Ana', lastName: 'Silva', email: 'ana@example.com', whatsapp: '(11) 99999-1234', bio: 'Professora de matemática.', subject: 'Matemática', cost: '20.00', schedules: [{ day: 'Segunda-feira', from: '08:00', to: '10:00' }] }
test('accepts a complete registration and rejects required empty fields', () => {
  assert.equal(teacherSchema.safeParse(valid).success, true)
  const result = teacherSchema.safeParse(emptyTeacher)
  assert.equal(result.success, false)
  for (const field of ['name', 'lastName', 'email', 'whatsapp', 'bio', 'subject', 'cost']) assert.ok(result.error.issues.some(issue => issue.path[0] === field))
})
test('limits biography, positive cost, valid email and DDD', () => {
  for (const change of [{ bio: 'a'.repeat(301) }, { cost: '0' }, { cost: '-10' }, { cost: 'Infinity' }, { email: 'invalid' }, { whatsapp: '12345' }]) assert.equal(teacherSchema.safeParse({ ...valid, ...change }).success, false)
  assert.equal(teacherSchema.safeParse({ ...valid, bio: 'a'.repeat(300) }).success, true)
})
test('rejects missing, inverted and overlapping schedules but accepts adjacent slots', () => {
  assert.equal(teacherSchema.safeParse({ ...valid, schedules: [] }).success, false)
  assert.equal(teacherSchema.safeParse({ ...valid, schedules: [{ day: 'Segunda-feira', from: '10:00', to: '08:00' }] }).success, false)
  assert.equal(teacherSchema.safeParse({ ...valid, schedules: [...valid.schedules, { day: 'Segunda-feira', from: '09:00', to: '11:00' }] }).success, false)
  assert.equal(teacherSchema.safeParse({ ...valid, schedules: [...valid.schedules, { day: 'Segunda-feira', from: '10:00', to: '11:00' }] }).success, true)
})
test('masks mobile and landline numbers and limits digits', () => {
  assert.equal(maskPhone('11999991234'), '(11) 99999-1234')
  assert.equal(maskPhone('1133331234'), '(11) 3333-1234')
  assert.equal(maskPhone('119999912345678'), '(11) 99999-1234')
  assert.equal(maskPhone(''), '')
})
test('persists profile data and recovers safely from corrupted storage', () => {
  const items = new Map()
  globalThis.localStorage = { getItem: key => items.get(key) ?? null, setItem: (key, value) => items.set(key, value) }
  saveTeacher(valid)
  assert.deepEqual(loadTeacher(), valid)
  items.set('proffy.teacher.v1', '{broken')
  assert.equal(loadTeacher(), null)
})
