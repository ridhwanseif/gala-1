import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { fetchCouncil, fetchMonth, fetchYear } from '../../api/upimajiFilterAPI';
import { ChartBar, ChartBar1, ChartBar2, ChartBar3 } from '../../utils/Chart';
import { fetchAllStudent, fetchMwatwaraSchools } from '../../api/mtwaraSchooleAPI';
import { Alert, Select, Spin } from 'antd';

export default function Dashboard() {

  const [year, setYear] = useState(2022);
  const [month, setMonth] = useState('Novemba');

  // Fetch
  const { data: years, isLoading: isLoadingYear, isError: isErrorYear } = useQuery('years', fetchYear);
  const { data: months, isLoading: isLoadingMonth, isError: isErrorMonth } = useQuery('months', fetchMonth);
  const { data: councils, isLoading: isLoadingCouncil, isError: isErrorCouncil } = useQuery('councils', fetchCouncil);
  const {
    data: school,
    isLoading: isLoadingSchool,
  } = useQuery('school', fetchMwatwaraSchools);

  const {
    data: student,
    isLoading: isLoadingStudent,
    error: fetchError,
  } = useQuery('student', fetchAllStudent);


  // Combine loading and error states
  const isLoading = isLoadingYear || isLoadingMonth;


  const schoolCount = school ? school?.length : 0;
  const councilCount = councils ? councils?.length : 0;
  const studentCount = student ? student?.length : 0;


  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-1">
            <div class="col-sm-6">
              <ol class="breadcrumb">
                <h5 className="m-0">Takwimu za Halmashauri za Mtwara</h5>
              </ol>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Nyumbani</a></li>
                <li class="breadcrumb-item active">Dashibodi</li>
              </ol>
            </div>
          </div>

          {/* <div className="row py-4">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{schoolCount}</h3>
                  <p>Jumla ya Shule</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
                <a href="#" className="small-box-footer">Maelezo <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{councilCount}</h3>
                  <p>Halmashauri za Mtwara</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <a href="#" className="small-box-footer">Maelezo <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>44</h3>
                  <p>Wanafunzi Wavulana</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="#" className="small-box-footer">Maelezo <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>65</h3>
                  <p>Jumla ya Wanafunzi</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <a href="#" className="small-box-footer">Maelezo <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
          </div> */}

          <div className="row py-2">
            <div className="col-sm-4">
              <div className="form-group">
                <label>Mwaka</label><br />
                {isLoadingYear ? (
                  <p>Loading...</p>
                ) : isErrorYear ? (
                  <p>Error loading years.</p>
                ) : (
                  <Select
                    defaultValue="Chagua Mwaka"
                    style={{ width: 150 }}
                    onChange={setYear} // no need to wrap it with (e) => setYear(e.target.value)
                  >
                    {years?.map((y) => (
                      <Option key={y} value={y}>{y}</Option>
                    ))}
                  </Select>
                )}
              </div>
            </div>
            <div className="col-sm-4 ">
              <div className="form-group">
                <label>Mwezi</label><br />
                {isLoadingMonth ? (
                  <p>Loading...</p>
                ) : isErrorMonth ? (
                  <p>Error loading months.</p>
                ) : (
                  <Select
                    defaultValue="Chagua Mwezi"
                    style={{ width: 150 }}
                    onChange={setMonth} // no need to wrap it with (e) => setYear(e.target.value)
                  >
                    {months?.map((m) => (
                      <Option key={m} value={m}>{m}</Option>
                    ))}
                  </Select>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      <section className="content">
        {fetchError && (
          <Alert className='flex-center' message="Error" description={fetchError.message} type="error" showIcon />
        )
        }
        <Spin spinning={isLoading} tip="Loading...">

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 col-6">
                <ChartBar1
                  month={month}
                  year={year}
                />
              </div>

              <div className="col-lg-6 col-6">
                <ChartBar
                  month={month}
                  year={year}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-6">
                <ChartBar2
                  month={month}
                  year={year}
                />
              </div>
              <div className="col-lg-6 col-6">
                <ChartBar3
                  month={month}
                  year={year}
                  council='MASASI DC'
                />
              </div>
            </div>
          </div>
        </Spin>

      </section>


    </>
  )
}
