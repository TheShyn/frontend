import { atom } from 'recoil';
import persistAtom from './recoilPersist';
export const inforProduct = atom({
    key: 'informationProduct',
    default: {},
    effects_UNSTABLE: [persistAtom],
});