import { create } from 'zustand';

type ModalStore = {
  isOpen: boolean;
  title: string;
  description: string;
  action: () => void;
  openModal: (title: string, description: string, action: () => void) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  title: '',
  description: '',
  action: () => {},
  openModal: (title, description, action) => set({ isOpen: true, title, description, action }),
  closeModal: () => set({ isOpen: false, title: '', description: '', action: () => {} }),
}));