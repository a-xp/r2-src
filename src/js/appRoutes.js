import NotFoundPage from "../pages/404";
import MembersPage from "../pages/members";
import BoardPage from '@/pages/board';
import HistoryPage from '@/pages/history';
import RolesPage from '@/pages/roles';


const routes = [
    {
        path: '/members/',
        component: MembersPage,
    },
    {
        path: '/board/',
        component: BoardPage,
    },
    {
        path: '/history/',
        component: HistoryPage,
    },
    {
        path: '/roles/',
        component: RolesPage,
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    }
];

export default routes;