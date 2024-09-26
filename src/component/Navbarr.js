import React from 'react';

const Navbarr = () => {
  return (
    <nav style={styles.navbar}>
      <h5 style={styles.title}>회로도잉</h5>
      <div style={styles.links}>
        <a href="#home" style={styles.link}>home</a>
        <a href="#store" style={styles.link}>이전 기록</a>
        <a href="#error" style={styles.link}>오류 신고</a>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    width: '100%',
    height: '50px', // 높이를 조금 더 높임
    backgroundColor: '#f8f9fa', // 밝은 배경색
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    boxSizing: 'border-box',
    borderBottom: '1px solid #ddd', // 경계선
  },
  title: {
    margin: 0,
    fontSize: '1rem',
    color: '#333',
  },
  links: {
    display: 'flex',
    gap: '15px', // 링크 간 간격
  },
  link: {
    color: '#007bff', // 파란색 링크
    textDecoration: 'none',
    fontSize: '0.9rem',
  }
};

export default Navbarr;
