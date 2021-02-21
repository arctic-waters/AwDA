/** @type {import('../src/index.ts').SDK} */
const sdk = new AwDA.SDK('http://localhost:3000/api')

async function run() {
  let user = await sdk.signup("test_user", "test_password")

  assert((await user.accounts()).length === 0)

  const account = await user.addAccount('email', 'lol', 'example@example.com')

  assert((await user.accounts()).length === 1)
  assert((await user.accounts())[0].name === account.name)

  console.log(await user.accounts())

  await user.removeAccount(account)

  assert((await user.accounts()).length === 0)
}

function assert(a) {
  if (!a)
    throw new Error('Assertion failed: ' + a)
}

run()
  .catch(e => console.error(e))