import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

interface SidebarState {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>()(
    devtools(
        persist(
            (set) => ({
                isSidebarOpen: false,
                toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            }),
            {
                name: 'sidebar-storage',
                skipHydration: true,
            }
        ),
    ),
)
