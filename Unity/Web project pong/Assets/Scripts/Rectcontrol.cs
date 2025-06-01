using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Rectcontrol : MonoBehaviour
{
    protected Rigidbody2D rb;
    public float speed = 10f;

    private void Start()
    {
        rb = GetComponent<Rigidbody2D>();

    }


}
