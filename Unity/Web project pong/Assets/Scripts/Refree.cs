using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using System.Runtime.InteropServices;
using UnityEngine.SocialPlatforms.Impl;

public class Refree : MonoBehaviour
{

    public ball balls;


    [DllImport("__Internal")]
    private static extern void SendResultToJS(int score);


    private void Start()
    {
       
    }

    public TextMeshProUGUI scoretext;
    private int score = 0;
    private void OnTriggerEnter2D(Collider2D other)
    {
        
        score++;
        scoretext.text = score.ToString();
        balls.startround();

        if (gameObject.tag == "AIGOAL")
        {
            PlayerPrefs.SetInt("PlayerScore", score);
            PlayerPrefs.Save();

            Debug.Log("Saved player score!");
            SendResultToJS(score);
        }

    }
}
