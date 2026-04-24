import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "North Lantern Group — Senior operators for Atlassian, BI, and operational automation.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #05101F 0%, #0A1628 50%, #00304B 100%)",
          color: "white",
          position: "relative",
        }}
      >
        {/* Ambient reservoir glow, bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-160px",
            right: "-120px",
            width: "640px",
            height: "640px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0, 235, 244, 0.30) 0%, rgba(0, 174, 239, 0.10) 38%, rgba(0, 0, 0, 0) 72%)",
            display: "flex",
          }}
        />

        {/* Subtle grid texture, top-left area */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "60%",
            height: "55%",
            backgroundImage:
              "linear-gradient(rgba(0, 174, 239, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 174, 239, 0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse at top left, black 15%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at top left, black 15%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* Top row: corner bracket + eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "26px",
              height: "26px",
              borderTop: "2px solid rgba(0, 235, 244, 0.85)",
              borderLeft: "2px solid rgba(0, 235, 244, 0.85)",
              borderTopLeftRadius: "2px",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: "22px",
              fontWeight: 500,
              letterSpacing: "0.36em",
              color: "rgba(0, 235, 244, 0.75)",
              display: "flex",
            }}
          >
            RESULTS THAT ENDURE
          </div>
        </div>

        {/* Center: logo mark + wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "44px",
            position: "relative",
          }}
        >
          <svg width="168" height="168" viewBox="25 25 150 150">
            <defs>
              <linearGradient
                id="og-sparkle"
                x1="47"
                y1="146"
                x2="47"
                y2="166"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#00EBF4" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
            </defs>
            <path
              d="M37.1333 129.866V37.1333H165.533V165.533H72.7999"
              stroke="white"
              strokeWidth="12.4833"
              strokeLinecap="square"
              fill="none"
            />
            <path
              d="M78.5065 126.3V76.3665H88.0651L117.526 112.318H112.889V76.3665H124.302V126.3H114.815L85.2831 90.3477H89.9198V126.3H78.5065Z"
              fill="white"
            />
            <path
              d="M47 146L49.1213 153.879L57 156L49.1213 158.121L47 166L44.8787 158.121L37 156L44.8787 153.879L47 146Z"
              fill="url(#og-sparkle)"
            />
          </svg>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 0.95,
            }}
          >
            <div
              style={{
                fontSize: "96px",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: "white",
                display: "flex",
              }}
            >
              North Lantern
            </div>
            <div
              style={{
                fontSize: "96px",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: "white",
                display: "flex",
                marginTop: "6px",
              }}
            >
              Group
            </div>
          </div>
        </div>

        {/* Bottom: tagline + domain */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "26px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: "30px",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.88)",
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              maxWidth: "960px",
              display: "flex",
            }}
          >
            Senior operators for Atlassian, BI, and operational automation. Same team from first call to handover.
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              marginTop: "4px",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: 500,
                letterSpacing: "0.22em",
                color: "rgba(0, 174, 239, 0.7)",
                display: "flex",
              }}
            >
              northlanterngroup.com
            </div>
            <div
              style={{
                flex: 1,
                height: "1px",
                background:
                  "linear-gradient(to right, rgba(0, 174, 239, 0.45), rgba(0, 174, 239, 0) 95%)",
                display: "flex",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
