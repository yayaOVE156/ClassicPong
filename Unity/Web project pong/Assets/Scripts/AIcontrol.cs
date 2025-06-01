using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class AIcontroller : Rectcontrol
{
    [SerializeField]
    private Rigidbody2D ball;
    private float difficulty = 8f;
    public TextMeshProUGUI scoreText;

    private void FixedUpdate()
    {
        
        if (int.Parse(scoreText.GetParsedText())> 10)
        {
            difficulty = 10f;
        }else if (int.Parse(scoreText.GetParsedText()) > 20)
        {
            difficulty = 12f;
        }
        else if (int.Parse(scoreText.GetParsedText()) > 30)
        {
            difficulty = 15f;
        }

        if (ball.velocity.x > 0f)
        {
            
            if (ball.position.y > rb.position.y)
            {
                rb.AddForce(Vector2.up * difficulty);
            }
            else if (ball.position.y < rb.position.y)
            {
                rb.AddForce(Vector2.down * difficulty);
            }
        }
        else
        {
            
            if (rb.position.y > 0f)
            {
                rb.AddForce(Vector2.down * difficulty);
            }
            else if (rb.position.y < 0f)
            {
                rb.AddForce(Vector2.up * difficulty);
            }
        }
    }
}
