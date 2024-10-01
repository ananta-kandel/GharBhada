import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';

const ClientBillView = () => {
    const { id } = useParams();
    const [billData, setBillData] = useState([]);
    const [totalRent, setTotalRent] = useState(0);
    const [isAmountZero, setIsAmountZero] = useState(true)
    useEffect(() => {
        // Fetch the client's bill data from the backend
        fetchBillData(id);
    }, [id]);

    const fetchBillData = async (clientId) => {
        // Replace with your actual backend API call
        // Example:
        const response = await fetch(`http://localhost:3000/owner/user/viewbill/1`);
        const data = await response.json();
        console.log(data)
        setBillData(data.bill || []);
        calculateTotalRent(data.bill || []);
    };

    const calculateTotalRent = (bills) => {
        let total = 0;
        bills.forEach(bill => {
            const { monthlyRent, electricityUnit, internetMoney, wasteMoney, otherCharges } = bill;
            const electricityCost = electricityUnit * 0.15; // Assuming $0.15 per unit
            total += monthlyRent + electricityCost + internetMoney + wasteMoney + otherCharges;
        });
        setTotalRent(total);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(billData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "All Bills");
        XLSX.writeFile(workbook, `All_Bills_${id}.xlsx`);
    };
   const handleClick= (e) =>{
      e.preventdefault()
      //calll calucalte total api
   }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">All Bills for Client ID: {id}</h1>

            <table className="table-auto w-full bg-white shadow-md rounded">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2">Year</th>
                        <th className='px-4 py-2'>Month</th>
                        <th className="px-4 py-2">Monthly Rent</th>
                        <th className="px-4 py-2">Electricity Units</th>
                        <th className="px-4 py-2">consumed Electricity Unit</th>
                        <th className="px-4 py-2">Internet Charges</th>
                        <th className="px-4 py-2">Waste Management</th>
                        <th className="px-4 py-2">Other Charges</th>
                        <th className="px-4 py-2">Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {billData.map((bill, index) => {
                        const { year, name, month, rent, total_amount, electricity_unit, internet_money, waste_money, otherCharges } = bill;
                        console.log(bill.total_amount)
                        return (
                            <tr key={index}>
                                <td className="border px-4 py-2">{year}</td>
                                <td className="border px-4 py-2">{month}</td>
                                <td className="border px-4 py-2">Rs.{rent}</td>
                                <td className="border px-4 py-2">{electricity_unit}</td>
                                <td className="border px-4 py-2">{electricity_unit}</td>
                                <td className="border px-4 py-2">{internet_money}</td>
                                <td className="border px-4 py-2">${waste_money}</td>
                                <td className="border px-4 py-2">${otherCharges}</td>
                                <td className="border px-4 py-2">{bill.total_amount > 0 ? (
                                    <td className=" px-4 py-2">
                                        {bill.total_amount}
                                    </td>
                                ) : (
                                    <td className=" px-4 py-2">
                                        <button onClick={handleClick}>Calculate Total</button>
                                    </td>
                                )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="mt-4">
                <p className="text-xl font-bold">Total Rent: ${totalRent.toFixed(2)}</p>
            </div>

            <div className="mt-4">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={exportToExcel}
                >
                    Export to Excel
                </button>
            </div>
        </div>
    );
};

export default ClientBillView;
