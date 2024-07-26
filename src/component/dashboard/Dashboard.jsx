import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { fetchCouncil, fetchMonth, fetchYear } from '../../api/upimajiFilterAPI';
import { ChartBar, ChartBar1, ChartBar2 } from '../../utils/Chart';
import { fetchMwatwaraSchools } from '../../api/mtwaraSchooleAPI';

export default function Dashboard() {

  const [year, setYear] = useState(2022);
  const [month, setMonth] = useState('Novemba');

  // Fetch
  const { data: years, isLoading: isLoadingYear, isError: isErrorYear } = useQuery('years', fetchYear);
  const { data: months, isLoading: isLoadingMonth, isError: isErrorMonth } = useQuery('months', fetchMonth);
  const { data: councils, isLoading: isLoadingCouncil, isError: isErrorCouncil } = useQuery('councils', fetchCouncil);
  const { data: school, isLoading: isLoadingSchool, isError: isErrorSchool } = useQuery('school', fetchMwatwaraSchools);
  const { data: student, isLoading: isLoadingStudent, isError: isErrorStudent } = useQuery('student', fetchMwatwaraSchools);

  // console.log(years)

  // Count the number of schools
  const schoolCount = school ? school?.length : 0;
  const studentCount = school ? school?.length : 0;

  return (
    <>
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-8 mt-1">
              <div className="row mb-2">
                <div class="col-sm-6">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Nyumbani</a></li>
                    <li class="breadcrumb-item active">Dashibodi</li>
                  </ol>
                </div>
              </div>
              <div className="row mb-2">
                <div class="col-sm-8">
                  <ol class="breadcrumb">
                    <h4 className="m-0">Takwimu za Halmashauri za Mtwara</h4>
                  </ol>
                </div>
              </div>
            </div>
            <div className="col-sm-4">

              <div className="row">
                <div className="col-sm-5 float-right">
                  <div className="form-group">
                    <label>Mwaka</label>
                    {isLoadingYear ? (
                      <p>Loading...</p>
                    ) : isErrorYear ? (
                      <p>Error loading years.</p>
                    ) : (
                      <select
                        className="form-control"
                        onChange={(e) => setYear(e.target.value)}
                      >
                        {years?.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
                <div className="col-sm-7 float-right">
                  <div className="form-group">
                    <label>Mwezi</label>
                    {isLoadingMonth ? (
                      <p>Loading...</p>
                    ) : isErrorMonth ? (
                      <p>Error loading months.</p>
                    ) : (
                      <select
                        className="form-control"
                        onChange={(e) => setMonth(e.target.value)}
                      >
                        {months.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* /.content-header */}

      {/* Main content */}
      <section className="content">
        {/* <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{schoolCount}</h3>
                  <p>Shule Zilizo Sajiliwa</p>
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
                  <h3>{studentCount}</h3>
                  <p>Wanafunzi</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="#" className="small-box-footer">Maelezo <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>44</h3>
                  <p>User Registrations</p>
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
                  <p>Unique Visitors</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <a href="#" className="small-box-footer">Maelezo <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
          </div>
        </div> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-6">
              {/* small box */}
              <ChartBar1
                month={month}
                year={year}
              />
            </div>
            {/* ./col */}

            <div className="col-lg-6 col-6">
              {/* small box */}
              <ChartBar
                month={month}
                year={year}
              />
            </div>
            {/* ./col */}
          </div>

          <div className="row">
            <div className="col-lg-6 col-6">
              {/* small box */}
              <ChartBar2
                month={month}
                year={year}
              />
            </div>
            {/* ./col */}
            <div className="col-lg-6 col-6">
              {/* small box */}
              <ChartBar1
                month={month}
                year={year}
              />
            </div>
            {/* ./col */}
          </div>
        </div>
      </section>
      {/* /.content */}


    </>
  )
}
