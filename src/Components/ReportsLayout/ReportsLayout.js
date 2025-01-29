import React, { useEffect } from 'react';
import './ReportsLayout.css';
import { useNavigate } from 'react-router-dom';
import ReportDocument from '../Reports/ReportDocument.pdf'

const ReportsLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");
        if (!authtoken) {
            navigate("/login");
        }
    }, [navigate]);

    // Sample report data 
    const reportData = [
        {
            serialNumber: 1,
            doctorName: 'Dr. Ramesh',
            doctorSpeciality: 'Cardiology',
            reportUrl: process.env.PUBLIC_URL + '/patient_report_1.pdf' // Example URL for report 1
        },
        {
            serialNumber: 2,
            doctorName: 'Dr. Harini',
            doctorSpeciality: 'Dermatology',
            reportUrl: process.env.PUBLIC_URL + '/patient_report_2.pdf' // Example URL for report 2
        },
        // Add more report data objects as needed 
    ];

    // Function to handle report download
    const handleDownload = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="reports-container">
            <h1>Reports</h1>
            <table className="report-table">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Doctor Name</th>
                        <th>Doctor Specialty</th>
                        <th>View Report</th>
                        <th>Download Report</th>
                    </tr>
                </thead>

                <tbody>
                    {reportData.map((report, index) => (
                        <tr key={report.serialNumber}>
                            <td>{report.serialNumber}</td>
                            <td>{report.doctorName}</td>
                            <td>{report.doctorSpeciality}</td>
                            <td>
                                <button onClick={() => window.open(report.reportUrl, '_blank')} className="report-link">
                                    View Report
                                </button>
                            </td>
                            <td>
                               <a href={ReportDocument} download target="_blank" rel="noopener noreferrer">
                          <button className='download-report'>Download Report</button>
                        </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportsLayout;
