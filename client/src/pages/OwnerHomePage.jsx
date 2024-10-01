// import React from 'react'

// const OwnerHomePage = () => {
//   return (
//     <>
//     <div className='bg-gray-50 h-[100vh]'>
//     <main className='container mx-auto p-4 bg-gray-50'>
//     <section className="bg-white rounded-lg shadow-md p-6 mb-8 mt-10">
//           <h2 className="text-2xl font-semibold mb-4">Welcome, Landlords!</h2>
//           <p className="mb-4 text-gray-600">Gharbhada is your all-in-one solution for managing your rental properties and tenants efficiently.</p>
//           <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition duration-300">
//             Get Started
//           </button>
//         </section>
//     </main>
//     </div>
//     </>
//   )
// }

// export default OwnerHomePage


///important
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data - replace with actual API calls in a real application
const initialOwnerProfile = {
  name: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  address: "123 Main St, Anytown, USA",
  properties: 5
};

const mockClients = [
  { id: 1, name: "Alice Smith", property: "Apt 101" },
  { id: 2, name: "Bob Johnson", property: "House 202" },
  { id: 3, name: "Charlie Brown", property: "Suite 303" },
];

const Profile = ({ profile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedProfile);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedProfile.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedProfile.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={editedProfile.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={editedProfile.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save Changes</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Properties:</strong> {profile.properties}</p>
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Edit Profile
      </button>
    </div>
  );
};

const CreateClientDialog = ({ onCreateClient, isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [property, setProperty] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateClient({ name, property });
    setName('');
    setProperty('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Client</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="property" className="block text-sm font-medium text-gray-700">Property</label>
            <input
              type="text"
              id="property"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Create Client</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ClientList = ({ clients, onClientClick }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Clients</h2>
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="text-left">Name</th>
          <th className="text-left">Property</th>
          <th className="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td className="py-2">{client.name}</td>
            <td className="py-2">{client.property}</td>
            <td className="py-2">
              <button
                onClick={() => onClientClick(client.id)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                View Bill
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const OwnerHomePage = () => {
  const [profile, setProfile] = useState(initialOwnerProfile);
  const [clients, setClients] = useState(mockClients);
  const [isCreateClientOpen, setIsCreateClientOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleCreateClient = (newClient) => {
    // In a real app, you would make an API call here
    const id = clients.length + 1;
    setClients([...clients, { id, ...newClient }]);
  };

  const handleClientClick = (clientId) => {
    navigate(`/client-bill/${clientId}`);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  const handleProfileSave = (updatedProfile) => {
    // In a real app, you would make an API call here
    setProfile(updatedProfile);
  };

  return (
    <>
     <div className='bg-gray-50 h-[100vh]'>
     <h1 className="text-3xl text-center m-4 font-bold">Owner Dashboard</h1>
     <main className='container mx-auto p-4 bg-gray-50'>
     <section className="bg-white rounded-lg shadow-md p-6 mb-8 mt-10">         
      <h2 className="text-2xl font-semibold mb-4">Welcome, Landlords!</h2>
           <p className="mb-4 text-gray-600">Gharbhada is your all-in-one solution for managing your rental properties and tenants efficiently.</p>
           <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition duration-300">
             Get Started
          </button>
         </section>
     </main>
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-2">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {showProfile ? "Dashboard" : "View Profile"}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
      {showProfile ? (
        <Profile profile={profile} onSave={handleProfileSave} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <button
              onClick={() => setIsCreateClientOpen(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Create Client
            </button>
            <ClientList clients={clients} onClientClick={handleClientClick} />
          </div>
        </div>
      )}
      <CreateClientDialog
        isOpen={isCreateClientOpen}
        onClose={() => setIsCreateClientOpen(false)}
        onCreateClient={handleCreateClient}
      />
    </div>
    
</div>
    </>
  );
};

export default OwnerHomePage
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { User, Plus, Users, LogOut } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// // Mock data - replace with actual API calls in a real application
// const ownerProfile = {
//   name: "John Doe",
//   email: "john@example.com",
//   properties: 5
// };

// const mockClients = [
//   { id: 1, name: "Alice Smith", property: "Apt 101" },
//   { id: 2, name: "Bob Johnson", property: "House 202" },
//   { id: 3, name: "Charlie Brown", property: "Suite 303" },
// ];

// const  OwnerHomePage = ({ profile }) => (
//   <Card>
//     <CardHeader>
//       <CardTitle>Profile</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <div className="flex items-center space-x-4">
//         <User size={48} />
//         <div>
//           <p className="font-semibold">{profile.name}</p>
//           <p className="text-sm text-gray-500">{profile.email}</p>
//           <p className="text-sm">Properties: {profile.properties}</p>
//         </div>
//       </div>
//     </CardContent>
//   </Card>
// );

// const CreateClientDialog = ({ onCreateClient }) => {
//   const [name, setName] = useState('');
//   const [property, setProperty] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onCreateClient({ name, property });
//     setName('');
//     setProperty('');
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button><Plus className="mr-2 h-4 w-4" /> Create Client</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Create New Client</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="property" className="block text-sm font-medium text-gray-700">Property</label>
//             <input
//               type="text"
//               id="property"
//               value={property}
//               onChange={(e) => setProperty(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               required
//             />
//           </div>
//           <Button type="submit">Create Client</Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// const ClientList = ({ clients, onClientClick }) => (
//   <Card>
//     <CardHeader>
//       <CardTitle>Clients</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Property</TableHead>
//             <TableHead>Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {clients.map((client) => (
//             <TableRow key={client.id}>
//               <TableCell>{client.name}</TableCell>
//               <TableCell>{client.property}</TableCell>
//               <TableCell>
//                 <Button variant="outline" onClick={() => onClientClick(client.id)}>
//                   View Bill
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </CardContent>
//   </Card>
// );

// const OwnerDashboard = () => {
//   const [clients, setClients] = useState(mockClients);
//   const navigate = useNavigate();

//   const handleCreateClient = (newClient) => {
//     // In a real app, you would make an API call here
//     const id = clients.length + 1;
//     setClients([...clients, { id, ...newClient }]);
//   };

//   const handleClientClick = (clientId) => {
//     navigate(`/client-bill/${clientId}`);
//   };

//   const handleLogout = () => {
//     // Implement logout logic here
//     console.log('Logging out...');
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Owner Dashboard</h1>
//         <Button variant="outline" onClick={handleLogout}>
//           <LogOut className="mr-2 h-4 w-4" /> Logout
//         </Button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <ProfileSection profile={ownerProfile} />
//         <div className="space-y-4">
//           <CreateClientDialog onCreateClient={handleCreateClient} />
//           <ClientList clients={clients} onClientClick={handleClientClick} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OwnerHomePage;