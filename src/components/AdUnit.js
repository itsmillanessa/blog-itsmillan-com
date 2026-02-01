import { useEffect } from 'react'

export default function AdUnit({ 
  slot, 
  style = {},
  className = "",
  responsive = true,
  format = "auto"
}) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (err) {
      console.log('AdSense error:', err)
    }
  }, [])

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-1234567890123456"
        data-ad-slot={slot}
        data-ad-format={responsive ? "auto" : format}
        data-full-width-responsive={responsive ? "true" : "false"}
      ></ins>
    </div>
  )
}

// Premium Ad Components
export function HeaderAd() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="text-center text-xs text-slate-400 mb-2 uppercase tracking-wide">
        Publicidad
      </div>
      <AdUnit 
        slot="1234567890"
        className="bg-slate-50 rounded-xl border border-slate-200 min-h-[120px] flex items-center justify-center"
        style={{ minHeight: '120px' }}
      />
    </div>
  )
}

export function SidebarAd() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="text-center text-xs text-slate-400 mb-4 uppercase tracking-wide">
        Publicidad
      </div>
      <AdUnit 
        slot="0987654321"
        className="min-h-[300px] bg-slate-50 rounded-lg"
        style={{ minHeight: '300px' }}
      />
    </div>
  )
}

export function InlineAd() {
  return (
    <div className="w-full my-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center text-xs text-slate-400 mb-3 uppercase tracking-wide">
          Publicidad
        </div>
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200">
          <AdUnit 
            slot="1122334455"
            className="min-h-[250px]"
            style={{ minHeight: '250px' }}
          />
        </div>
      </div>
    </div>
  )
}

export function FooterAd() {
  return (
    <div className="w-full bg-slate-50 py-12 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center text-xs text-slate-400 mb-4 uppercase tracking-wide">
          Publicidad
        </div>
        <AdUnit 
          slot="5544332211"
          className="bg-white rounded-2xl border border-slate-200 min-h-[120px] shadow-sm"
          style={{ minHeight: '120px' }}
        />
      </div>
    </div>
  )
}