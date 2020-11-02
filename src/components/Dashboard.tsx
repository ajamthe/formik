import * as React from 'react';

interface ApplicationSummary {
    id: number;
    reference: string;
    client: string;
    product: string;
    status: string;
}

const Dashboard: React.FunctionComponent = () => {
const [data, setData] = React.useState<ApplicationSummary[]>([]);
React.useEffect(() => {
    fetch('/api/alpha')
    .then(res => res.json())
    .then(body => {
        setData(body.data);
    })
    .catch(err => console.log(err))
}, []);
  return (
      <div>
        <table id="draftApplications">
            <tbody>
                {
                    data.map((appSummary) => <tr key={appSummary.id}>
                        <td>{appSummary.reference}</td>
                        <td>{appSummary.client}</td>
                        <td>{appSummary.product}</td>
                        </tr>)
                }
            </tbody>
        </table>
      </div>
  );
};

export default Dashboard;