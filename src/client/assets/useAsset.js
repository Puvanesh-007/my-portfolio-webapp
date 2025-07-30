import { useState, useEffect } from 'react';

const useAsset = (assetType) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`Fetching asset: ${assetType}`);
        
        const response = await fetch(`/api/assets/${assetType}`);
        console.log(`Response status: ${response.status}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('API Response:', result);
        
        if (result.success) {
          // Extract the data field from the asset object
          // The API should return the asset with its data field
          const assetData = result.data?.data || result.data;
          setData(assetData);
          console.log('Data set successfully:', assetData);
        } else {
          throw new Error(result.message || 'Failed to fetch asset');
        }
      } catch (err) {
        console.error(`Error fetching ${assetType}:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (assetType) {
      fetchAsset();
    }
  }, [assetType]);

  // Helper function to refresh the data
  const refetch = () => {
    if (assetType) {
      setLoading(true);
      setError(null);
      // Re-trigger the useEffect by updating a dependency
      fetchAsset();
    }
  };

  return { 
    data, 
    loading, 
    error, 
    refetch 
  };
};

export default useAsset;