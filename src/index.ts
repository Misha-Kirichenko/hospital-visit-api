import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import DoctorController from '@/resources/doctor/doctor.controller';

validateEnv();

const app = new App([new DoctorController()], Number(process.env.PORT));
app.listen();
