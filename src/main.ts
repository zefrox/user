import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { environments } from './common/environments'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap () {
  console.log('Starting App')
  const app = await NestFactory.create(AppModule)
  await app.listen(environments.projectPort)
  console.log(`App already started in port: ${environments.projectPort}`)
}
void bootstrap()
