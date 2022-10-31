import { Link } from 'react-router-dom'
import { useEffect, useState, useRef }from 'react';

function Boxoffice() {
  // state 변수
  const [viewDay, setViewday] = useState();
  const [viewDayf, setViewdayF ] = useState();
  const [officeList, setofficeList] = useState([]);

  // ref변수
  const refDateIn = useRef();

  // then, catch 구문
  const getBoxoffice = async (d) => {
    let url = 'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?';
    url = url + 'key=' + 'f5eef3421c602c6cb7ea224104795888';
    url = url + '&targetDt=' + d;

    // 비동기 통신
/*     fetch(url) 
      .then((res) => res.json())
      .then((data) => console.log(data))      
      .catch((err) =>{console.log(err)}) */
  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data.boxOfficeResult.dailyBoxOfficeList);
    let dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
    setofficeList(
      dailyBoxOfficeList.map((item)=> <li key={item.movieCd}>
        <Link to={'/mv?mvcd=' + item.movieCd}>
        {item.rank}위 {item.movieNm}  {item.rankInten > 0 ? "🔺" : item.rankInten < 0 ? "🔻" : '◾'}
        {Math.abs(Number(item.rankInten))}
        </Link>
      </li>)
    );

  }

  catch (err) {
    console.log(err);
  }
}

  
  // 페이지가 처음 렌더링이 되었을 때 실행되는 HOOK
  useEffect(() => {
    // 어제 날짜 추출
    const yesterday = new Date();
    yesterday.setDate(new Date().getDate() -1);
    let d = yesterday.toISOString().substring(0,10).replaceAll('-','');

    //state 변수 변경
    setViewday(d);

    // 박스오피스 open API 
    getBoxoffice(d);
  }, []);

  useEffect(() => {
    (viewDay && setViewdayF(viewDay.substring(0,4)+'.'+viewDay.substring(4,6)+"."+viewDay.substring(6,8)))
    getBoxoffice(viewDay)
  }, [viewDay]);
  
  // event 함수
  const handleChange = (e) => {
    e.preventDefault();


    setViewday(refDateIn.current.value.replaceAll('-',''));

  }

  return (
    <>
      <h1>박스오피스 ({viewDayf}일자)</h1>
      <div className='body'>
        <form>
          <input type="date" name="dateIn" ref={refDateIn} onChange={handleChange}/>
        </form>
        <ul>
          {officeList}
        </ul>
      </div>
    </>

  );
}

export default Boxoffice;