import { Routes, Route } from 'react-router-dom';
import { Layout } from "./components/layout/layout.component";
import { ClientsList } from "features/clients/clientsList.components";
import { AddClient } from "features/clients/addClient.component";
import { EditClient } from "features/clients/editClient.component";
import { DeleteClient } from 'features/clients/deleteClient.component';
import { DashLayout } from "components/dash/dashLayout.compoment";
import { UsersList } from "features/users/usersList.components";
import { AddUser } from "features/users/addUser.component";
import { EditUser } from "features/users/editUser.component";
import { DeleteUser } from 'features/users/deleteUser.component';
import { Shipments } from "features/shipments/shipmentsList.components";
import { AddShipment } from 'features/shipments/addShipment.component';
import { AddService } from 'features/services/addService.component';
import { DeleteService } from 'features/services/deleteService.component';
import { EditService } from 'features/services/editService.component';
import { ServicesList } from 'features/services/servicesList.components';
import { Login } from 'features/auth/login.component';
import { Public } from 'components/public/public.component';
import { Welcome } from 'components/dash/welcome.component';
import { RequireAuth } from 'features/auth/requireAuth';
import { PersistLogin } from 'features/auth/persistLogin.component';
import { Prefetch } from 'features/auth/prefetch.component';
import { ROLES } from './config/roles'
import './app.css'
import useTitle from 'hooks/useTitle';
import { EditShipment } from 'features/shipments/editShipment.component';

function App() {
  useTitle('Shopper Seguro')
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
      {/* public routes */}
      <Route index element={<Public />} />
      <Route path="login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<PersistLogin />}>
      <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
      <Route element={<Prefetch />}>
          <Route path="dash" element={<DashLayout />}>
            <Route index element={<Welcome />} />
          
            <Route path="clients">
              <Route index element={<ClientsList />} />
              <Route path="add" element={<AddClient />} />
              <Route path="edit/:id" element={<EditClient />} />
              <Route path="delete/:id" element={<DeleteClient />} />
            </Route>

            <Route path="services">
              <Route index element={<ServicesList />} />
              <Route path="add" element={<AddService />} />
              <Route path="edit/:id" element={<EditService />} />
              <Route path="delete/:id" element={<DeleteService />} />
            </Route>

            <Route path="shipments">
              <Route index element={<Shipments />} />
              <Route path="add" element={<AddShipment/>} />
              <Route path="edit/:id" element={<EditShipment />} />
            </Route>

            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path="add" element={<AddUser />} />
              <Route path="edit/:id" element={<EditUser />} />
              <Route path="delete/:id" element={<DeleteUser />} />
            </Route>

          </Route>{/* End Dash */}
        </Route>{/* End RquireAuth */}
        </Route>{/* End PersistLogin */}
      </Route>{/* End Layout */}
      </Route>   
      </Routes>
  );
}

export default App;
