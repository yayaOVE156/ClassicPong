Shader "Custom/SpriteWithVerticalLineAndInvert"
{
    Properties
    {
        [PerRendererData] _MainTex ("Sprite Texture", 2D) = "white" {}
        _Color ("Tint", Color) = (1,1,1,1)
        _LineX ("Line X Position", Float) = 0.0
        _LineThickness ("Line Thickness", Float) = 0.05
        _TintColor ("Invert Tint", Color) = (1,1,1,1) // Used in invert blend
    }

    SubShader
    {
        // === Pass 1: Invert what's behind ===
        Pass
        {
            Tags { "Queue"="Transparent" "IgnoreProjector"="True" }
            ZWrite Off
            ZTest Always
            Cull Off
            Blend OneMinusDstColor OneMinusSrcColor
            ColorMask RGB

            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"

            float4 _TintColor;

            struct appdata
            {
                float4 vertex : POSITION;
            };

            float4 vert (appdata v) : SV_POSITION
            {
                return UnityObjectToClipPos(v.vertex);
            }

            fixed4 frag () : SV_Target
            {
                return _TintColor;
            }
            ENDCG
        }

        // === Pass 2: Draw Sprite with Vertical Line ===
        Tags { "Queue"="Transparent" "RenderType"="Transparent" }
        LOD 100

        Blend SrcAlpha OneMinusSrcAlpha
        Cull Off
        Lighting Off
        ZWrite Off

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"

            struct appdata_t
            {
                float4 vertex : POSITION;
                float2 texcoord : TEXCOORD0;
            };

            struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 vertex : SV_POSITION;
                float3 worldPos : TEXCOORD1;
            };

            sampler2D _MainTex;
            float4 _MainTex_ST;
            float4 _Color;

            float _LineX;
            float _LineThickness;

            v2f vert (appdata_t v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = TRANSFORM_TEX(v.texcoord, _MainTex);
                o.worldPos = mul(unity_ObjectToWorld, v.vertex).xyz;
                return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
                fixed4 col = tex2D(_MainTex, i.uv) * _Color;

                float xDist = abs(i.worldPos.x - _LineX);
                float scaleFactor = length(float2(unity_ObjectToWorld[0][0], unity_ObjectToWorld[1][0]));
                if (xDist < (_LineThickness * scaleFactor))
                {
                    col.rgb = 0;
                }

                return col;
            }
            ENDCG
        }
    }
}
