import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import DoctorController from '@/resources/doctor/doctor.controller';
import AdminController from '@/resources/admin/admin.controller';
import VisitController from '@/resources/visit/visit.controller';

validateEnv();

const app = new App(
  [new DoctorController(), new AdminController(), new VisitController()],
  Number(process.env.PORT)
);
app.listen();
