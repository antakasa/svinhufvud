import React from 'react';
const ListItems = ({match}) => {
  const [data, setData] = useState(null);

  const id = match.params.id;
  const tag = 13;
  const url =
    'http://www.svinhufvudinmuistosaatio.fi/wp-json/wp/v2/posts?tag=13';
  useEffect(() => {
    const data = fetchData(url, setData);
  }, []);

  const replaceImages = domNode => {
    if (isValidImage(domNode)) {
      const captionText = WpCaption(domNode) ? getCaptionText(domNode) : false;
      const imageDetails = getImageDetails(domNode);
      if (imageDetails)
        return <LazyImage caption={captionText} image={imageDetails} />;
    }
  };
  return (
    <div>
      <div className="feature-container">
        {!data && <h3>Pieni hetki. Ladataan...</h3>}

        {data && (
          <>
            <h1>{parse(data.title.rendered)}</h1>
            <div>
              {parse(data.content.rendered.replace(/\s/g, ' '), {
                replace: replaceImages,
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Feature;
