
import { AiOutlineFileAdd } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { HiOutlineHome } from "react-icons/hi";
import { BsWallet } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBank } from "react-icons/bs";
import { IoCashOutline } from "react-icons/io5";
import { FaLaptop } from "react-icons/fa";
import iciciImage from "../assets/iciciLogo.png";
import axisImage from "../assets/axisBank.png";

export const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
}

export const STATUS = {
    FILED: 'filed',
    PENDING: 'pending',
    SCHEDULED: 'scheduled',
    ADJOURNED: 'adjourned',
    DISMISSED: 'dismissed',
    CLOSED: 'closed'
}

export const userSideBar = [
    {
        icon: HiOutlineHome,
        title: 'Dashboard',
        url: '/dashboard',
        type: 'redirection'
    },
    {
        icon: AiOutlineFileAdd,
        title: 'New Slot Registration',
        url: '/new-registration',
        type: 'redirection',
    },
    {
        icon: BsWallet,
        title: 'Wallet Topup',
        url: '/payments',
        type: 'redirection',
    },
    {
        icon: IoSettingsOutline,
        title: 'Settings',
        type: "redirection",
        url: '/settings'
    },
    {
        icon: TbLogout,
        title: 'Logout',
        type: 'button',
        url: '/logout'
    }
];

export const adminSideBar = [
    {
        icon: HiOutlineHome,
        title: 'Dashboard',
        url: '/dashboard',
        type: 'redirection'
    },
    {
        icon: BsWallet,
        title: 'Transactions',
        url: '/payments',
        type: 'redirection',
    },
    {
        icon: IoSettingsOutline,
        title: 'Settings',
        type: "redirection",
        url: '/settings'
    },
    {
        icon: TbLogout,
        title: 'Logout',
        type: 'button',
        url: '/logout'
    }
];

export const paymentMethods = [
    {
        title: "UPI",
        value: 'upi',
        icon: BsBank,
    },
    {
        title: "Net Banking",
        value: "net-banking",
        icon: FaLaptop,

    },
    {
        title: "Cash On Delivery",
        value: "COD",
        icon: IoCashOutline,
    }
]

export const paymentCards = [
    {
        id: 1,
        bankName: "ICICI Debit card",
        holderName: 'Mr. abc def kumar',
        cardNumber: '1324-1231-1231-7456',
        cvv: '123',
        bankImage: iciciImage,
        expiry: '12/24'
    },
    {
        id: 2,
        bankName: "Axis Debit card",
        holderName: 'Mr. abc def kumar',
        cardNumber: '1324-1231-1231-7456',
        cvv: '123',
        bankImage: axisImage,
        expiry: '12/24'
    },
]

export const typeOfCases = [
    {
        "id": 1,
        "name": "Criminal Case",
        "description": "Cases involving offenses against the state or society, prosecuted by the government.",
        "examples": ["Theft", "Murder", "Fraud", "Cybercrime"],
        "fees": 500,
    },
    {
        "id": 2,
        "name": "Civil Case",
        "description": "Disputes between individuals or entities involving rights, obligations, or compensation.",
        "examples": ["Breach of Contract", "Property Dispute", "Defamation", "Consumer Protection Claim"],
        "fees": 650,
    },
    {
        "id": 3,
        "name": "Family Law Case",
        "description": "Cases related to domestic relations and family matters.",
        "examples": ["Divorce", "Child Custody", "Adoption", "Domestic Violence"],
        "fees": 820,
    },
    {
        "id": 4,
        "name": "Constitutional Case",
        "description": "Cases involving challenges to the constitutionality of laws or government actions.",
        "examples": ["Fundamental Rights Violation", "Election Disputes", "Law Interpretation"],
        "fees": 740,
    },
    {
        "id": 5,
        "name": "Administrative Law Case",
        "description": "Disputes between individuals or organizations and government agencies over administrative decisions.",
        "examples": ["License Denial", "Tax Disputes", "Pension Issues", "Regulatory Challenges"],
        "fees": 480,
    },
    {
        "id": 6,
        "name": "Labor and Employment Case",
        "description": "Disputes between employers and employees over workplace rights and contracts.",
        "examples": ["Unlawful Termination", "Wage Disputes", "Workplace Harassment", "Union Matters"],
        "fees": 690,
    },
    {
        "id": 7,
        "name": "Property and Land Dispute",
        "description": "Disputes involving the ownership, use, or transfer of property or land.",
        "examples": ["Land Title Disputes", "Tenant-Landlord Issues", "Easement Conflicts"],
        "fees": 580,
    },
    {
        "id": 8,
        "name": "Commercial and Corporate Case",
        "description": "Disputes related to business transactions and corporate governance.",
        "examples": ["Breach of Business Contracts", "Bankruptcy", "Shareholder Disputes", "Intellectual Property Issues"],
        "fees": 620,
    },
    {
        "id": 9,
        "name": "Environmental Case",
        "description": "Cases dealing with violations of environmental laws and regulations.",
        "examples": ["Pollution Control", "Illegal Deforestation", "Wildlife Conservation"],
        "fees": 620,
    },
    {
        "id": 10,
        "name": "Juvenile Case",
        "description": "Cases involving offenses committed by minors, focusing on rehabilitation.",
        "examples": ["Vandalism", "Substance Abuse", "Truancy", "Underage Curfew Violation"],
        "fees": 650,
    },
    {
        "id": 11,
        "name": "Tax Case",
        "description": "Disputes between individuals or businesses and tax authorities over assessments or collections.",
        "examples": ["Income Tax Disputes", "GST Disputes", "Property Tax Appeals", "Customs Duty Cases"],
        "fees": 760,
    },
    {
        "id": 12,
        "name": "Intellectual Property Case",
        "description": "Cases involving the protection of intellectual property rights.",
        "examples": ["Trademark Infringement", "Copyright Violations", "Patent Disputes", "Trade Secret Theft"],
        "fees": 700,
    },
    {
        "id": 13,
        "name": "Election Dispute",
        "description": "Disputes arising from elections or electoral processes.",
        "examples": ["Voter Fraud Allegations", "Disqualification of Candidates", "Election Result Challenges"],
        "fees": 680,
    },
    {
        "id": 14,
        "name": "Public Interest Litigation (PIL)",
        "description": "Cases filed to protect public interest or enforce public policies.",
        "examples": ["Environmental Protection PIL", "Healthcare Improvement", "Human Rights Violation PIL"],
        "fees": 570,
    },
    {
        "id": 15,
        "name": "Arbitration and Dispute Resolution Case",
        "description": "Disputes resolved through arbitration or alternative dispute resolution methods.",
        "examples": ["Commercial Arbitration", "Mediation in Family Disputes", "Construction Contract Arbitration"],
        "fees": 510,
    }
];

export const lawyersData = [
    {
        id: '1',
        fullName: "Adv. Rohan Mehta",
        enrollmentNumber: "D/1234/2020",
        barCouncilAffiliation: "Bar Council of Delhi",
        practiceCertificate: "DL123456",
        cases: [
            {
                id: "C12345",
                caseTitle: "State vs. John Doe",
            },
            {
                id: "C12349",
                caseTitle: "ACME Corp vs. New Technologies Ltd.",
            }
        ],
        officeAddress: {
            street: "123 Law Chambers",
            city: "New Delhi",
            state: "Delhi",
            postalCode: "110001"
        },
        contactDetails: {
            phoneNumber: "+91-9876543210",
            email: "rohan.mehta@lawfirm.com"
        },
        vakalatnamaSigned: true,
        authorizedRepresentative: {
            firmName: "Mehta & Associates",
            representingLawyer: "Adv. Rohan Mehta"
        },
        courtDetails: {
            courtName: "Delhi High Court",
            jurisdiction: "Delhi",
            caseNumber: "HC12345678"
        },
        feeAgreement: {
            retainerFee: 50000,
            feeCurrency: "INR",
            paymentTerms: "50% advance, 50% upon completion of case"
        }
    },
    {
        fullName: "Adv. Neha Sharma",
        enrollmentNumber: "MH/5678/2018",
        barCouncilAffiliation: "Bar Council of Maharashtra & Goa",
        practiceCertificate: "MH567890",
        cases: [
            {
                id: "C12345",
                caseTitle: "State vs. John Doe",
            },
            {
                id: "C12347",
                caseTitle: "City of Metropolis vs. Alex Johnson",
            }
        ],
        officeAddress: {
            street: "456 Justice Avenue",
            city: "Mumbai",
            state: "Maharashtra",
            postalCode: "400001"
        },
        contactDetails: {
            phoneNumber: "+91-9123456789",
            email: "priya.sharma@lawfirm.com"
        },
        vakalatnamaSigned: true,
        authorizedRepresentative: {
            firmName: "Sharma Legal Services",
            representingLawyer: "Adv. Priya Sharma"
        },
        courtDetails: {
            courtName: "Bombay High Court",
            jurisdiction: "Maharashtra",
            caseNumber: "BHC98765432"
        },
        feeAgreement: {
            retainerFee: 60000,
            feeCurrency: "INR",
            paymentTerms: "30% advance, 70% upon case progress"
        }
    },
    {
        fullName: "Adv. Jiya Sharma",
        enrollmentNumber: "MH/5678/2018",
        barCouncilAffiliation: "Bar Council of Maharashtra & Goa",
        practiceCertificate: "MH567890",
        cases: [
            {
                id: "C12345",
                caseTitle: "State vs. John Doe",
            },
            {
                id: "C12347",
                caseTitle: "City of Metropolis vs. Alex Johnson",
            }
        ],
        officeAddress: {
            street: "456 Justice Avenue",
            city: "Mumbai",
            state: "Maharashtra",
            postalCode: "400001"
        },
        contactDetails: {
            phoneNumber: "+91-9123456789",
            email: "priya.sharma@lawfirm.com"
        },
        vakalatnamaSigned: true,
        authorizedRepresentative: {
            firmName: "Sharma Legal Services",
            representingLawyer: "Adv. Priya Sharma"
        },
        courtDetails: {
            courtName: "Bombay High Court",
            jurisdiction: "Maharashtra",
            caseNumber: "BHC98765432"
        },
        feeAgreement: {
            retainerFee: 60000,
            feeCurrency: "INR",
            paymentTerms: "30% advance, 70% upon case progress"
        }
    },
    {
        fullName: "Adv. Priya Sharma",
        enrollmentNumber: "MH/5678/2018",
        barCouncilAffiliation: "Bar Council of Maharashtra & Goa",
        practiceCertificate: "MH567890",
        cases: [
            {
                id: "C12345",
                caseTitle: "State vs. John Doe",
            },
            {
                id: "C12347",
                caseTitle: "City of Metropolis vs. Alex Johnson",
            }
        ],
        officeAddress: {
            street: "456 Justice Avenue",
            city: "Mumbai",
            state: "Maharashtra",
            postalCode: "400001"
        },
        contactDetails: {
            phoneNumber: "+91-9123456789",
            email: "priya.sharma@lawfirm.com"
        },
        vakalatnamaSigned: true,
        authorizedRepresentative: {
            firmName: "Sharma Legal Services",
            representingLawyer: "Adv. Priya Sharma"
        },
        courtDetails: {
            courtName: "Bombay High Court",
            jurisdiction: "Maharashtra",
            caseNumber: "BHC98765432"
        },
        feeAgreement: {
            retainerFee: 60000,
            feeCurrency: "INR",
            paymentTerms: "30% advance, 70% upon case progress"
        }
    }
]

export const allCourts = [
    {
        "name": "Supreme Court of India",
        "courtAddress": "New Delhi, IND"
    },
    {
        "name": "Delhi High Court",
        "courtAddress": "New Delhi, IND"
    },
    {
        "name": "Bombay High Court",
        "courtAddress": "Mumbai, MH"
    },
    {
        "name": "Calcutta High Court",
        "courtAddress": "Kolkata, WB"
    },
    {
        "name": "Madras High Court",
        "courtAddress": "Chennai, TN"
    },
    {
        "name": "Allahabad High Court",
        "courtAddress": "Prayagraj, UP"
    },
    {
        "name": "Karnataka High Court",
        "courtAddress": "Bengaluru, KA"
    },
    {
        "name": "Punjab and Haryana High Court",
        "courtAddress": "Chandigarh, PB/HR"
    },
    {
        "name": "Gauhati High Court",
        "courtAddress": "Guwahati, AS"
    },
    {
        "name": "Kerala High Court",
        "courtAddress": "Ernakulam, KL"
    },
    {
        "name": "Rajasthan High Court",
        "courtAddress": "Jodhpur, RJ"
    },
    {
        "name": "Patna High Court",
        "courtAddress": "Patna, BR"
    },
    {
        "name": "Madhya Pradesh High Court",
        "courtAddress": "Jabalpur, MP"
    },
    {
        "name": "Jharkhand High Court",
        "courtAddress": "Ranchi, JH"
    }
]
