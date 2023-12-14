import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [login, setLogin] = useState(false);
  const [sites, setSites] = useState([]);
  const history = useHistory();
  const [error, setError] = useState('');
  const [siteName, setSiteName] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [showAddSiteForm, setShowAddSiteForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('Token not found in local storage');
          return history.push('/login');
        }

        const userResponse = await axios.get('https://dvisual-server-api.vercel.app/user', {
          headers: {
            authorization: `${token}`,
          },
        });

        if (userResponse.data.success) {
          setLogin(true);
          setEmail(userResponse.data.user.email);

          const organizationResponse = await axios.get(`https://dvisual-server-api.vercel.app/organization`);
          setOrganizationName(organizationResponse.data.organizationname);

          const sitesResponse = await axios.get(`https://dvisual-server-api.vercel.app/sites`);
          setSites(sitesResponse.data.sites);
        } else {
          history.push('/login');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Internal Server Error');
      }
    };

    fetchData();
  }, [history]);

  const handleAddSite = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token not found in local storage');
        return history.push('/login');
      }

      const response = await axios.post(
        'https://dvisual-deployment.vercel.app/add-site',
        {
          site_name: siteName,
          site_location: siteLocation,
        },
        {
          headers: {
            authorization: `${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setShowAddSiteForm(false);
        setSiteName('');
        setSiteLocation('');
        setError('');

        // Update the state to include the new site
        setSites((prevSites) => [
          ...prevSites,
          {
            site_id: response.data.siteId,
            site_name: siteName,
            site_location: siteLocation,
          },
        ]);
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error('Error adding site:', error);
      setError('Internal Server Error');
    }
  };

  const handleSiteButtonClick = (siteId) => {
    history.push(`/visualize/${siteId}`);
  };

  return (
    <>
      <section
        style={{
          backgroundColor: '#f8f8f8',
          color: '#333',
          width: '100%',
          minHeight: '90vh',
          padding: '20px',
        }}
      >
        <div className="sitedabba container-xxl">
          {sites.map((site) => (
            <div
              class="added-button"
              key={site.site_id}
              onClick={() => handleSiteButtonClick(site.site_id)}
            >
              {site.site_name} - {site.site_location}
            </div>
          ))}
        </div>
        {showAddSiteForm ? (
          <>
            <div class="afterbutton">
              <div>
                <label class="sitename-label">Site Name:</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </div>
              <div>
                <label class="sitelocation-label">Site Location:</label>
                <input
                  type="text"
                  value={siteLocation}
                  onChange={(e) => setSiteLocation(e.target.value)}
                />
                <button onClick={handleAddSite}>Add Site</button>
                <button onClick={() => setShowAddSiteForm(false)}>Cancel</button>
              </div>
            </div>
          </>
        ) : (
          <button class="mysitebutton" onClick={() => setShowAddSiteForm(true)}>
            Add Site
          </button>
        )}
        <div className="box">
          <p>Email: {login ? email : null}</p>
          <p>Organization Name: {organizationName}</p>
        </div>
      </section>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default Profile;
