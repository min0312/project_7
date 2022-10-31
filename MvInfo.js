import '../css/Mv.css'; 

//useState Hook
import { useState, useEffect, useRef } from 'react' ;

function MvInfo(probs) {
  //json 데이터 가져오기
  const mvinfo = probs.m.movieInfoResult.movieInfo;
  
  // //화면에 출력할 정보를 오브젝트 생성
  let myinfo = {};
  const key1 = ['movieNm', 'movieCd', 'openDt', 'prdtStatNm', 'showTm',];
  const key2 = ['audits', 'nations', 'directors', 'genres', 'companys'];

  const keys = {
    'movieNm': '영화명',
    'movieCd': '영화코드',
    'openDt': '개봉일자',
    'prdtStatNm': '제작상태',
    'showTm': '상영시간',
    'audits': '관람등급',
    'nations': '제작국가',
    'directors': '감독',
    'genres': '장르',
    'companys': '배급사',
  }

  //key1에 해당하는 값추출
  for (let k of key1) {
    myinfo[keys[k]] = mvinfo[k];
  }

  // //key2에 해당하는 값추출 : 배열에서 추출
  for (let k of key2) {
    switch (k) {
      case 'audits':
        myinfo[keys[k]] = mvinfo[k].map((item) => item.watchGradeNm);
        break;
      case 'nations':
        myinfo[keys[k]] = mvinfo[k].map((item) => item.nationNm);
        break;
      case 'directors':
        myinfo[keys[k]] = mvinfo[k].map((item) => item.peopleNm);
        break;
      case 'genres':
        myinfo[keys[k]] = mvinfo[k].map((item) => item.genreNm);
        break;
      default:
        myinfo[keys[k]] = mvinfo[k].filter((item) => item.companyPartNm === '배급사');
        myinfo[keys[k]] = myinfo[keys[k]].map((item) => item.companyNm);
        break;
    }
  }

  //화면에 출력할 내용을 JSX로 만들기
  let lis = [];

  for (let [k, v] of Object.entries(myinfo)) {
    lis.push(<li key={myinfo.movieCd + k} className='infoLi'>
      ✔ <span className='infoSpan1'>{k}</span> : <span className='infoSpan2'>{v}</span>
    </li>);
  }


  //useEffect Hook : 컴포넌트 생성시 한번 발생
  useEffect(() => {
    
  }, []) ;

  
  return (
    <>
      <div className='mvList'>
        <h1 className='infoH1'>영화상세🎬</h1>
        <ul className='infoUl'>
          {lis}
        </ul> 
      </div>
    </>
  );
}

export default MvInfo;