import { api } from 'boot/axios';
import { MenuModel } from '../../types/sistema/sistemaModel';

export class Menu {
  constructor() {
    console.log('accesando Menu');
  }
  async Get(): Promise<MenuModel[]> {
    const { data } = await api.get('/api/Menus');

    return data;
  }
}
