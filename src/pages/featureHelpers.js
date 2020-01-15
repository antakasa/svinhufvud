const determineImageClass = (className, width, height) => {
  // check if there is special class added in WP...
  if (className.indexOf('feature-vaaka') > -1) return 'feature-vaaka-container';
  else if (className.indexOf('feature-pysty-vasen') > -1)
    return 'feature-pysty-container vasen';
  else if (className.indexOf('feature-pysty-oikea') > -1)
    return 'feature-pysty-container oikea';
  else if (
    className.indexOf('feature-pysty-keskella') > -1 ||
    className.indexOf('feature-pysty') > -1
  )
    return 'feature-pysty-container keskella';
  //... if not, determine from width & height
  else if (width > height) return 'feature-vaaka-container';
  else if (height > width) return 'feature-pysty-container keskella';
  else return false;
};
export const getImageDetails = domNode => {
  const imgNode = domNode.children.filter(e => {
    return e.name === 'img';
  });
  if (imgNode.length > 0 && imgNode[0].attribs) {
    return {
      ...imgNode[0].attribs,
      mode: determineImageClass(
        imgNode[0].attribs.class,
        imgNode[0].attribs.width,
        imgNode[0].attribs.height,
      ),
    };
  } else return null;
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

export const WpCaption = domNode =>
  // checks whether node is an Wordpress image container
  domNode.name === 'div' &&
  domNode.attribs.class &&
  domNode.attribs.class.indexOf('wp-caption') > -1;

export const isValidImage = domNode => {
  const {children} = domNode;
  if (!children) return false;
  for (let i = 0; i < children.length; i++) {
    if (children[i].name === 'img') {
      return true;
    }
  }
};
