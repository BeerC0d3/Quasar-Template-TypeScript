import { ref } from 'vue';
import { Menu } from '../../services/sistema/menuService';
import { MenuModel } from '../../types/sistema/sistemaModel';

const MenuService = new Menu();
const menus = ref<MenuModel[]>([]);

const getAll = async () => {
  const tmpMenus = await MenuService.Get();
  // console.log(tmpMenus);
  menus.value = [...tmpMenus];

  return tmpMenus;
};

export default () => ({
  getAll,
  menus,
});
