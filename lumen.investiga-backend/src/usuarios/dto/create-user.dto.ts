export class CreateUserDto {
  name: string;
  last_name: string;
  email: string;
  password: string;
  codigo: number;
  foto_url: string;
  isTeacher: boolean;
}