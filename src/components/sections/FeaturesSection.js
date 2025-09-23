import React, { useState } from 'react';
import {
  MdStoreMallDirectory,
  MdInventory,
  MdLocalShipping,
  MdOutlineReceiptLong,
  MdOutlineReplay,
  MdOutlineScale,
  MdOutlineGavel,
} from 'react-icons/md';
import { AiOutlineThunderbolt, AiOutlineSync, AiOutlineDollarCircle } from 'react-icons/ai';
import { FaBoxes, FaHandHoldingUsd } from 'react-icons/fa';
import orderManagementImg from '../../assets/front/images/features/ecommerceImg.png';
import automationImg from '../../assets/front/images/features/automationLarge.png';
import shippingImg from '../../assets/front/images/features/Freeshipping-amico.png';
import reconciliationImg from '../../assets/front/images/features/reconcilation.png';
import './featuresSection.styles.css';

const featuresTabs = [
  {
    label: 'Parking Management',
    image: orderManagementImg,
    title: 'Centralized control of parking zones and slots',
    desc: 'Manage all your parking facilities from a unified digital dashboard.',
    pointers: [
      {
        icon: <MdStoreMallDirectory size={32} color="#FFB940" />,
        title: 'Multi-location integration',
        desc: 'Oversee multiple parking lots and garages across different regions in one system',
      },
      {
        icon: <FaBoxes size={32} color="#FFB940" />,
        title: 'Bulk slot configuration',
        desc: 'Configure and update multiple parking slots simultaneously with batch operations',
      },
      {
        icon: <MdInventory size={32} color="#FFB940" />,
        title: 'Digital permit management',
        desc: 'Issue, track, and validate parking permits and passes in real-time',
      },
    ],
  },
  {
    label: 'Automation',
    image: automationImg,
    title: 'Automate your parking operations',
    desc: 'Boost efficiency by automating routine parking tasks and workflows.',
    pointers: [
      {
        icon: <MdLocalShipping size={32} color="#FFB940" />,
        title: 'Smart slot assignment',
        desc: 'Automatically allocate parking slots based on vehicle type, availability, and user preferences',
      },
      {
        icon: <MdOutlineReceiptLong size={32} color="#FFB940" />,
        title: 'Auto-ticket generation',
        desc: 'Generate parking tickets and receipts instantly upon entry or booking',
      },
      {
        icon: <AiOutlineSync size={32} color="#FFB940" />,
        title: 'Real-time occupancy updates',
        desc: 'Keep users and staff informed with live updates on slot availability and usage',
      },
    ],
  },
  {
    label: 'Monitoring',
    image: shippingImg,
    title: 'Smart surveillance and parking enforcement',
    desc: 'Ensure secure and compliant parking with integrated monitoring tools.',
    pointers: [
      {
        icon: <AiOutlineDollarCircle size={32} color="#FFB940" />,
        title: 'License plate recognition',
        desc: 'Use ANPR technology to track vehicle entry, exit, and violations automatically',
      },
      {
        icon: <MdOutlineReplay size={32} color="#FFB940" />,
        title: 'Violation alerts',
        desc: 'Detect overstays, unauthorized parking, and send instant alerts to enforcement teams',
      },
      {
        icon: <AiOutlineThunderbolt size={32} color="#FFB940" />,
        title: 'Incident reporting',
        desc: 'Log and manage parking-related incidents with automated reporting tools',
      },
    ],
  },
  {
    label: 'Analytics',
    image: reconciliationImg,
    title: 'Data-driven parking insights and reporting',
    desc: 'Optimize your parking operations with actionable analytics.',
    pointers: [
      {
        icon: <MdOutlineScale size={32} color="#FFB940" />,
        title: 'Usage trends',
        desc: 'Analyze peak hours, occupancy rates, and user behavior to improve planning',
      },
      {
        icon: <FaHandHoldingUsd size={32} color="#FFB940" />,
        title: 'Revenue tracking',
        desc: 'Monitor earnings from parking fees, subscriptions, and penalties in real-time',
      },
      {
        icon: <MdOutlineGavel size={32} color="#FFB940" />,
        title: 'Compliance metrics',
        desc: 'Track adherence to parking regulations and enforcement efficiency',
      },
    ],
  },
];

const FeaturesSection = () => {
  const [tab, setTab] = useState(0);
  return (
    <section className="features-section">
      <div className="features-section-title">
        Transforming Parking{' '}
        <span className="features-section-highlight">Management</span>
        {' '}for{' '}
        <span className="features-section-strong">Next Gen-Vehicles</span>
      </div>
      <div className="features-tabs">
        {featuresTabs.map((t, i) => (
          <div
            key={t.label}
            className={`features-tab${tab === i ? ' selected' : ''}`}
            onClick={() => setTab(i)}
            style={{ cursor: 'pointer' }}
          >
            {t.label}
          </div>
        ))}
      </div>
      <div className="features-content-row">
        <img
          className="features-image"
          src={featuresTabs[tab].image}
          alt={featuresTabs[tab].label}
        />
        <div className="features-content">
          <div className="features-content-title">{featuresTabs[tab].title}</div>
          <div className="features-content-desc">{featuresTabs[tab].desc}</div>
          <div className="features-pointers">
            {featuresTabs[tab].pointers.map((p, idx) => (
              <div className="features-pointer" key={idx}>
                <div className="features-pointer-icon">
                  {React.cloneElement(p.icon, { color: '#222' })}
                </div>
                <div className="features-pointer-title">{p.title}</div>
                <div className="features-pointer-desc">{p.desc}</div>
              </div>
            ))}
          </div>
          <button
            className="features-btn"
            onClick={() => window.location.href = '/contact-us'}
          >
            Try Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
