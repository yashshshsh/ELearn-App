import './App.css';
import Dashboard from './Mycomponents/Dashboard';
import StudentsignUp from './Mycomponents/StudentsignUp'
import TeachersignUp from './Mycomponents/TeachersignUp';
import StudentsPort from './Mycomponents/StudentsPort'
import TeachersPort from './Mycomponents/TeachersPort'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Studentlogin from './Mycomponents/Studentlogin';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Assignment from './Mycomponents/Portcomponents/TeachersPort/Assignment'
import About from './Mycomponents/Portcomponents/TeachersPort/About';
import ProfileState from './Mycomponents/Context/Profile/ProfileTeacher/ProfileState';
// import Teacherlogin from './Mycomponents/Teacherlogin';
import TcontentState from './Mycomponents/Context/Content/TcontentState';
import Teacherlogin from './Mycomponents/Teacherlogin';
import TAssignmentState from './Mycomponents/Context/Assignment/TAssignmentState';
import Stusearch from './Mycomponents/Portcomponents/StudentsPort/Stusearch';
import Profilestudentstate from './Mycomponents/Context/Profile/Profilestudent/Profilestudentstate';
import ViewProfile from './Mycomponents/Portcomponents/StudentsPort/ViewProfile';
import Stassignment from './Mycomponents/Portcomponents/StudentsPort/Stassignment';
import AccessReqState from './Mycomponents/Context/AccessReq/AccessReqState';
import NotificationState from './Mycomponents/Context/Notifications/NotificationState';
import TeacherHome from './Mycomponents/Portcomponents/TeachersPort/TeacherHome';
import Stabout from './Mycomponents/Portcomponents/StudentsPort/Stabout';

function App() {
  return (
    <>
      <NotificationState>
        <AccessReqState>
          <Profilestudentstate>
            <ProfileState>
              <TcontentState>
                <TAssignmentState>
                  <Router>
                    <Routes>
                      
                      <Route exact path='/' element={<Dashboard />} />
                      <Route exact path='/teachersignup' element={<TeachersignUp />} />
                      <Route exact path='/studentsignup' element={<StudentsignUp />} />
                      <Route exact path='/studentLogin' element={<Studentlogin />} />
                      <Route exact path='/teacherLogin' element={<Teacherlogin />} />
                      
                      {/* Teacher's Routes */}
                      <Route exact path='/Tmaterials' element={<TeacherHome />} />
                      <Route exact path='/Tstudents' element={<StudentsPort />} />
                      <Route exact path='/Tassignments' element={<Assignment />} />
                      <Route exact path='/Taboutus' element={<About/>} />

                      {/* Student's Routes */}

                      <Route exact path='/Stmaterials' element={<Stusearch />} />
                      <Route exact path='/viewProfile' element={<ViewProfile />} />
                      <Route exact path='/Stassignments' element={<Stassignment />} />
                      <Route exact path='/Staboutus' element={<Stabout />} />
                    </Routes>
                  </Router>
                </TAssignmentState>
              </TcontentState>
            </ProfileState>
          </Profilestudentstate>
        </AccessReqState>
      </NotificationState>
    </>
  );
}

export default App;
