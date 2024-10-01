import React from 'react'
import Layout from '../components/layout'
import { Home, Users, CreditCard } from 'lucide-react';
const FeatureCard = ({ title, description, Icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Icon className="w-6 h-6 text-primary mr-2" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
  
const HomePage = () => {
  return (
    <>
    <Layout>
    <div className="bg-background min-h-screen">
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Gharbhada</h1>
          <p className="text-xl">Simplify Your Rental Property Management</p>
        </div>
      </header>

      <main className="container mx-auto mt-8 p-4">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome, Landlords!</h2>
          <p className="mb-4 text-gray-600">Gharbhada is your all-in-one solution for managing your rental properties and tenants efficiently.</p>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition duration-300">
            Get Started
          </button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Tenant Management"
            description="Easily add, update, and manage your tenants' information in one place."
            Icon={Users}
          />
          <FeatureCard
            title="Rent Tracking"
            description="Keep track of rent payments and generate reports with ease."
            Icon={CreditCard}
          />
          <FeatureCard
            title="Property Maintenance"
            description="Log and manage maintenance requests for your properties efficiently."
            Icon={CreditCard}
          />
        </section>
      </main>

      
    </div>
    </Layout>
    </>
    
  )
}
export default HomePage;