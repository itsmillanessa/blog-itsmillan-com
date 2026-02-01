import { useEffect } from 'react'

export default function AdUnit({ 
  adSlot, 
  adFormat = 'auto',
  adLayout = '',
  adLayoutKey = '',
  style = {},
  className = ''
}) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-ad-layout-key={adLayoutKey}
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Predefined ad configurations
export const AdFormats = {
  BANNER_728x90: {
    adSlot: "1234567890",
    style: { width: '728px', height: '90px' },
    className: "mx-auto"
  },
  RECTANGLE_300x250: {
    adSlot: "2345678901", 
    style: { width: '300px', height: '250px' },
    className: "mx-auto"
  },
  SKYSCRAPER_300x600: {
    adSlot: "3456789012",
    style: { width: '300px', height: '600px' },
    className: "mx-auto"
  },
  RESPONSIVE_AUTO: {
    adSlot: "4567890123",
    adFormat: "auto",
    style: { display: 'block' },
    className: "w-full"
  },
  IN_ARTICLE: {
    adSlot: "5678901234",
    adFormat: "fluid",
    adLayout: "in-article",
    style: { display: 'block', textAlign: 'center' },
    className: "mx-auto my-8"
  }
}