import React from 'react'

function Logo({width = '100px'}) {
  return (
     <div style={styles.app}>
      {/* Inline CSS */}
      <style>{`
        @keyframes logo-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .logo {
          height: 120px;
          animation: logo-spin infinite 20s linear;
        }

        @media (prefers-reduced-motion: reduce) {
          .logo {
            animation: none;
          }
        }
      `}</style>

      {/* React SVG logo inline */}
      <svg
        className="logo"
        viewBox="-11.5 -10.23174 23 20.46348"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="#61DAFB"
        strokeWidth="1"
      >
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>

     
    </div>
  )
}

const styles = {
  app: {
    minHeight: "20vh",
    backgroundColor: "",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Logo