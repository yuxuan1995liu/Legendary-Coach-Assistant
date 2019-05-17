using System;
using Tobii.Interaction;

namespace Interaction_Streams_101
{
    /// <summary>
    /// The data streams provide nicely filtered eye-gaze data from the eye tracker 
    /// transformed to a convenient coordinate system. The point on the screen where 
    /// your eyes are looking (gaze point), and the points on the screen where your 
    /// eyes linger to focus on something (fixations) are given as pixel coordinates 
    /// on the screen. The positions of your eyeballs (eye positions) are given in 
    /// space coordinates in millimeters relative to the center of the screen.
    /// 


    //public static class Globals
     //   {
     ///   public static double[] coorl;
     //   public static int count = 0;
    //}

    public class Program
    {
        public static void Main(string[] args)
        {
            // Everything starts with initializing Host, which manages connection to the 
            // Tobii Engine and provides all the Tobii Core SDK functionality.
            // NOTE: Make sure that Tobii.EyeX.exe is running
            var host = new Host();
            System.IO.StreamWriter file = new System.IO.StreamWriter(@"..\..\..\web\data\gaze_output.txt", true);
            //double x_temp, y_temp;
            


            // 2. Create stream. 
            var gazePointDataStream = host.Streams.CreateGazePointDataStream();
            //double[] coor;

            // 3. Get the gaze data
            gazePointDataStream.GazePoint((x, y, ts) => Console.WriteLine("Timestamp: {0}\t X: {1} Y:{2}", ts, x, y));
            gazePointDataStream.GazePoint((x, y, ts) => file.Write(x.ToString("0.000000")+" "+y.ToString("0.000000")+"\r\n"));
            //gazePointDataStream.GazePoint((x, y, ts) => { coor = System.Math.Abs(System.Math.Pow((x - 960), 2.0)), System.Math.Abs(System.Math.Pow((y - 540), 2.0))};);
            //x_temp = System.Math.Abs(System.Math.Pow((x - 960), 2.0));
            //y_temp = System.Math.Abs(System.Math.Pow((y - 540), 2.0));
            //double l2 = System.Math.Sqrt(coor[0] + coor[1]);
            //int i = Globals.count % 10;
            //Globals.coorl[i] = l2;
            //i = i + 1;
            //if (i%10 == 9)
           // {
            //    double l2_avg = System.Linq.Enumerable.Sum(Globals.coorl) / 10;
             //   file.Write(l2_avg.ToString("0.000000"));
            //}


            Console.ReadKey();
            file.Close();
            // close the coonection to the Tobii Engine before exit.
            host.DisableConnection();
        }
    }
}
