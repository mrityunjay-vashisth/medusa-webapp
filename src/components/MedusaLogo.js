// src/components/MedusaLogo.js
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Medusa Logo Component
 * Provides a flexible and reusable logo component
 */
export const MedusaLogo = ({ 
  color = 'white', 
  size = '3rem', 
  className = '', 
  showTrademark = true,
  variant = 'default'
}) => {
  // Variant-specific styles
  const variantStyles = {
    default: {
      fontWeight: 300,
    },
    bold: {
      fontWeight: 600,
    },
    light: {
      fontWeight: 100,
    }
  };

  const logoStyle = {
    color: color,
    fontSize: size,
    fontWeight: variantStyles[variant].fontWeight,
    display: 'flex',
    alignItems: 'center',
    lineHeight: 1
  };

  const trademarkStyle = {
    fontSize: `calc(${size} * 0.3)`,
    verticalAlign: 'super',
    marginLeft: '2px'
  };

  return (
    <div 
      className={`medusa-logo ${className}`} 
      style={logoStyle}
      aria-label="Medusa Logo"
    >
      medusa cloud
      {showTrademark && (
        <span style={trademarkStyle}>™</span>
      )}
    </div>
  );
};

// Prop type validation
MedusaLogo.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  showTrademark: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'bold', 'light'])
};

// Logo configuration constants
export const MEDUSA_LOGO_CONFIG = {
  name: 'medusa',
  trademark: '™',
  colors: {
    primary: '#0a4a4a',  // Teal from sidebar
    white: 'white',
    black: '#1f2937',    // Dark gray from other UI elements
    gray: '#6b7280'      // Neutral gray
  },
  variants: {
    default: 'default',
    bold: 'bold',
    light: 'light'
  }
};

// Preset logo configurations for easy use
export const LogoPresets = {
  sidebar: {
    color: MEDUSA_LOGO_CONFIG.colors.white,
    size: '3rem'
  },
  formHeader: {
    color: MEDUSA_LOGO_CONFIG.colors.black,
    size: '1.5rem',
    alignItems: 'center'
  },
  footer: {
    color: MEDUSA_LOGO_CONFIG.colors.gray,
    size: '1rem'
  }
};

export default MedusaLogo;