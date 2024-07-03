import './parts/accordion';
import { mobileNav, openNav } from './parts/navigation';
import './parts/splide';
import { scrolling } from './parts/scrolling';
import './parts/pop-up';
import './parts/account';
import { loginFormSumbit } from './parts/login';
import { recoveryFormSumbit } from './parts/recovery';
import { formFunc } from './parts/form';

mobileNav();
openNav();
scrolling();
loginFormSumbit();
recoveryFormSumbit();
formFunc();
