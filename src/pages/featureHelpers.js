export const getImageDetails = domNode => {
  const imgNode = domNode.children.filter(
    e =>
      e.attribs.class.indexOf('feature-vaaka') > -1 ||
      e.attribs.class.indexOf('feature-pysty') > -1,
  );
  if (imgNode.length > 0 && imgNode[0].attribs)
    return {
      ...imgNode[0].attribs,
      mode:
        imgNode[0].attribs.class.indexOf('feature-vaaka') > -1
          ? 'vaaka'
          : 'pysty',
    };
  else return null;
};

export const getCaptionText = domNode => {
  const captionTextNode = domNode.children.filter(
    e => e.attribs.class.indexOf('wp-caption-text') > -1,
  );
  if (
    captionTextNode.length === 0 ||
    captionTextNode[0].children.length === 0 ||
    !captionTextNode[0].children[0].data
  )
    return null;

  const captionText = captionTextNode[0].children[0].data;

  return captionText;
};

const WpCaption = domNode =>
  // checks whether node is an Wordpress image container
  domNode.name === 'div' &&
  domNode.attribs.class &&
  domNode.attribs.class.indexOf('wp-caption') > -1;

export const isValidImage = domNode => {
  if (!WpCaption(domNode)) return false;
  const {children} = domNode;
  for (let i = 0; i < children.length; i++) {
    if (
      children[i].attribs &&
      children[i].attribs.class &&
      (children[i].attribs.class.indexOf('feature-vaaka') > -1 ||
        children[i].attribs.class.indexOf('feature-pysty') > -1)
    ) {
      return true;
    }
  }
};
