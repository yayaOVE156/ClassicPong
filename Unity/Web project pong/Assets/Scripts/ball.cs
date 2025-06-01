using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ball : MonoBehaviour
{
    private Rigidbody2D rb;

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        startround();
          
    }

    private void Update()
    {
        if(Input.GetKeyDown(KeyCode.Space))
        {
           
            startround();
        }
    }

    public void startround()
    {
        rb.velocity = Vector2.zero;
        transform.position = Vector2.zero;
        float x = Random.value < 0.5f ? -1f : 1f;
        float y = Random.value < 0.5f ? Random.Range(-1f,-.5f) :Random.Range(.5f,1f);
        rb.AddForce(new Vector2(x, y) * 250f);
    }

    
}
