import { useState } from "react";
import { Link, Route } from "react-router-dom";
import "./Sidebar.css"; // 스타일 적용

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* 사이드바 */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "" : ""}
        </button>
        <div>
          <ul className="top-box">
            <li>
              글 쓰기
            </li>
            <ul className="top-in-box">
              <li>최신글</li>
              <li>중요</li>
              <li>내 게시글</li>
            </ul>
          </ul>
        </div>
        <ul>
                <li>🏠 Home</li>
                <li>✨ Features</li>
                <li>💰 Pricing</li>
                <li>⚙️ Settings</li>
            {/* <Route>
                <li><Link to="/">🏠 Home</Link></li>
                <li><Link to="/features">✨ Features</Link></li>
                <li><Link to="/pricing">💰 Pricing</Link></li>
                <li><Link to="/settings">⚙️ Settings</Link></li>
            </Route> */}
          
        </ul>
      </div>

      {/* 메인 콘텐츠 */}
      {/* <div className={`content ${isOpen ? "shifted" : ""}`}>
        <h1>Welcome to the Dashboard</h1>
      </div> */}
    </>
  );
}

export default Sidebar;
